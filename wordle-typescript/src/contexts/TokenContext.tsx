// src/contexts/TokenContext.tsx
import React, { createContext, useContext, useState } from "react";

interface TokenContextType {
  token: string | null;
  isAuthenticated: boolean;
  storeToken: (token: string) => void;
  clearToken: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const storeToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <TokenContext.Provider value={{ token, isAuthenticated, storeToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = (): TokenContextType => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
