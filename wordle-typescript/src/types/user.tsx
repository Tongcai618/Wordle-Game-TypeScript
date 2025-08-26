// src/types/user.ts
export interface UserStats {
    wins: number;
}

export interface UserProfile {
    id: string;
    email: string;
    username: string;
    createdAt: string;     // ISO date
    userStats?: UserStats;    // optional if your API doesn’t send stats yet
}
