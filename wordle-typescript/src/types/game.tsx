// src/types/Game.ts

export type Color = "GREEN" | "YELLOW" | "GREY";

export interface GuessResult {
  guess: string;
  feedback: Color[];
}

export interface GuessOutcome {
  gameId: string;
  guess: string;
  feedback: Color[];
  correct: boolean;
  tries: number;
  maxTries: number;
  finished: boolean;
  history: GuessResult[];
  keyboardColors: Record<string, string | null>; 
  finishedAt?: string;
}

export interface GameDTO {
  id: string;
  ownerEmail: string;
  maxTries: number; 
  tries: number;
  finished: boolean;
  won: boolean;
  history: GuessResult[];
  finishedAt: string; 
}
