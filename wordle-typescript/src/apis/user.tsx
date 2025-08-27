// src/apis/user.ts
import http from "./http";
import type { UserProfile } from "../types/user";
import type { GameDTO } from "../types/game";
/**
 * Fetch the authenticated user's profile.
 * Assumes your backend route is GET /api/users/me
 * and that your axios instance (http) injects the Bearer token.
 */
export const getMe = async (): Promise<UserProfile> => {
  const { data } = await http.get<UserProfile>("/users/me");
  console.log(data);
  return data;
};

export const getMyGameActivities = async (days: number): Promise<GameDTO[]> => {
  const { data } = await http.get<GameDTO[]>(`/users/me/game-activities?${days}`);
  console.log(data);
  return data;
}
