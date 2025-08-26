// src/apis/auth.ts
import http from "./http";
import type { SignupRequest, LoginRequest, AuthResponse } from "../types/auth";

export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await http.post("/auth/signup", data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await http.post("/auth/login", data);
  return response.data;
};
