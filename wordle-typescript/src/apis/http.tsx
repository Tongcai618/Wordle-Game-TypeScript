// src/apis/http.ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://2e3f359c6e3a.ngrok-free.app";

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token if exists
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
