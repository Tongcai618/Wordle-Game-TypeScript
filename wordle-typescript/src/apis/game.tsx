// src/apis/game.ts
import http from "./http";
import type { Game, GuessOutcome } from "../types/game";

// POST /api/wordle/games/new
export const startNewGame = async (): Promise<string> => {
  const response = await http.post<{ gameId: string }>("/wordle/games/new");
  return response.data.gameId;
};

// POST /api/wordle/games/refresh
export const refreshGame = async (): Promise<string> => {
  const response = await http.post<{ gameId: string }>("/wordle/games/refresh");
  return response.data.gameId;
};

// GET /api/wordle/games/load?id=...
export const loadGame = async (id: string): Promise<Game> => {
  const response = await http.get<{ game: Game }>("/wordle/games/load", {
    params: { id },
  });
  return response.data.game;
};

// POST /api/wordle/games/guess?id=...&guess=...
export const submitGuess = async (
  id: string,
  guess: string
): Promise<GuessOutcome> => {
  const response = await http.post<{ Result: GuessOutcome }>(
    "/wordle/games/guess",
    null, // No request body
    {
      params: { id, guess },
    }
  );
  return response.data.Result;
};
