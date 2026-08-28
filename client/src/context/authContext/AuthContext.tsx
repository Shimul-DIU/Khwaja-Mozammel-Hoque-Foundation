"use client";

import {
  createContext,
  useState,
  type ReactNode,
} from "react";

import axiosInstance from "@/lib/axios";

import type {
  User,
  AuthContextType,
} from "@/types/auth";

export const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<User | null>(null);

  const [accessToken, setAccessToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const refreshSession = async () => {
    setLoading(false);
  };

  const register = async (formData: FormData) => {
    const response = await axiosInstance.post(
      "/api/auth/createDevotee",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Registration failed");
    }

    setUser(response.data.data ?? null);
  };

  const logout = async () => {
    try {
      await axiosInstance.post(
        "/api/auth/logout"
      );
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  // ==================================================
  // INITIAL SESSION
  // ==================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        register,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}