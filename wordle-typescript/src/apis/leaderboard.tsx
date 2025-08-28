// src/apis/leaderboard.ts
import http from "./http";

/**
 * Fetch the authenticated user's profile.
 * Assumes your backend route is GET /api/users/me
 * and that your axios instance (http) injects the Bearer token.
 */
export const getLeaderboardRank = async (): Promise<Record<string, number>> => {
    const { data } = await http.get<Record<string, number>>("/leaderboard/rank");
    console.log(data);
    return data;
}