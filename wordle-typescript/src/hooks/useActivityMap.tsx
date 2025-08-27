import { useMemo } from "react";
import type { GameDTO } from "../types/game";

export const useActivityMap = (games: GameDTO[] | null): Record<string, number> => {
  return useMemo(() => {
    const map: Record<string, number> = {};
    if (!games) return map;

    games.forEach((game) => {
      if (!game.finishedAt) return;

      const parsedDate = new Date(game.finishedAt);
      if (isNaN(parsedDate.getTime())) return;

      const date = parsedDate.toISOString().slice(0, 10);
      map[date] = (map[date] || 0) + 1;
    });

    return map;
  }, [games]);
};
