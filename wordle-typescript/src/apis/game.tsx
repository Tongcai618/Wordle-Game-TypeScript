// src/apis/game.ts
import http from "./http";
import type { GameDTO, GuessOutcome } from "../types/game";

// POST /api/wordle/games/new
export const startNewGame = async (level: "SIMPLE" | "NORMAL" = "NORMAL"): Promise<string> => {
  const response = await http.post<{ gameId: string }>(`/wordle/games/new?level=${level}`);
  return response.data.gameId;
};

// POST /api/wordle/games/refresh
export const refreshGame = async (level: "SIMPLE" | "NORMAL" = "NORMAL"): Promise<string> => {
  const response = await http.post<{ gameId: string }>(`/wordle/games/refresh?level=${level}`);
  return response.data.gameId;
};

// GET /api/wordle/games/load?id=...
export const loadGame = async (id: string): Promise<GameDTO> => {
  const response = await http.get<{ game: GameDTO }>("/wordle/games/load", {
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
    null,
    {
      params: { id, guess },
    }
  );
  return response.data.Result;
};

// GET /api/wordle/games/solutions?id=...
export const getGameSolution = async(id: string): Promise<String> => {
  const response = await http.get<{solution: String}>("/wordle/games/solution", {
    params: {id},
  })
  return response.data.solution;
}