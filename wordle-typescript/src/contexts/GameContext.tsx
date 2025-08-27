// src/contexts/GameContext.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import type { GameDTO, GuessOutcome } from "../types/game";
import * as gameAPI from "../apis/game";

interface GameContextType {
    game: GameDTO | null;
    gameId: string | null;
    loading: boolean;
    error: string | null;
    level: string;
    setLevel: (level: "SIMPLE" | "NORMAL") => void;
    startGame: (levelOverride?: "SIMPLE" | "NORMAL") => Promise<void>;
    refreshGame: (levelOverride?: "SIMPLE" | "NORMAL") => Promise<void>;
    loadGame: (id: string) => Promise<void>;
    submitGuess: (guess: string) => Promise<GuessOutcome | null>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [game, setGame] = useState<GameDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [level, setLevel] = useState<"SIMPLE" | "NORMAL">("SIMPLE");


    const startGame = useCallback(async (levelOverride?: "SIMPLE" | "NORMAL") => {
        try {
          setLoading(true);
          const finalLevel = levelOverride ?? level;
          const gameId = await gameAPI.startNewGame(finalLevel);
          const newGame = await gameAPI.loadGame(gameId);
          setGame(newGame);
        } catch (err) {
          setError("Failed to start a new game.");
        } finally {
          setLoading(false);
        }
      }, [level]);
      
      const refreshGame = useCallback(async (levelOverride?: "SIMPLE" | "NORMAL") => {
        try {
          setLoading(true);
          const finalLevel = levelOverride ?? level;
          const gameId = await gameAPI.refreshGame(finalLevel);
          const refreshedGame = await gameAPI.loadGame(gameId);
          setGame(refreshedGame);
        } catch (err) {
          setError("Failed to refresh the game.");
        } finally {
          setLoading(false);
        }
      }, [level]);
      

    const loadGame = useCallback(async (id: string) => {
        try {
            setLoading(true);
            const loaded = await gameAPI.loadGame(id);
            setGame(loaded);
        } catch (err) {
            setError("Failed to load the game.");
        } finally {
            setLoading(false);
        }
    }, []);

    const submitGuess = useCallback(async (guess: string): Promise<GuessOutcome | null> => {
        if (!game) return null;
        try {
            setLoading(true);
            const outcome = await gameAPI.submitGuess(game.id, guess);
            setGame(prev => prev ? {
                ...prev,
                history: outcome.history,
                tries: outcome.tries,
                finished: outcome.finished,
                won: outcome.correct,
            } : null);
            return outcome;
        } catch (err) {
            setError("Failed to submit guess.");
            return null;
        } finally {
            setLoading(false);
        }
    }, [game]);

    return (
        <GameContext.Provider
            value={{
                game,
                gameId: game?.id ?? null,
                loading,
                error,
                level,
                setLevel,
                startGame,
                refreshGame,
                loadGame,
                submitGuess
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGame = (): GameContextType => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
};
