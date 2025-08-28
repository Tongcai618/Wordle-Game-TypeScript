// src/types/user.ts
export interface UserStats {
    simpleWins: number;
    normalWins: number;
}

export interface UserProfile {
    id: string;
    email: string;
    username: string;
    createdAt: string;     // ISO date
    userStats?: UserStats;    // optional if your API doesn’t send stats yet
}
