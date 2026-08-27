"use client";

import {
  createContext,
  useCallback,
  useEffect,
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
    useState(true);

  // ==================================================
  // RESTORE SESSION
  // ==================================================

  // const refreshSession = useCallback(
  //   async () => {
  //     try {
  //       setLoading(true);

  //       const response =
  //         await axiosInstance.post(
  //           "/api/auth/refresh"
  //         );

  //       setUser(response.data.user);

  //       setAccessToken(
  //         response.data.accessToken
  //       );
  //     } catch (error) {
  //       console.error(
  //         "Session restore failed:",
  //         error
  //       );

  //       setUser(null);
  //       setAccessToken(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   []
  // );




  // ==================================================
  // LOGOUT
  // ==================================================

  const login = async () => {
    try {
      await axiosInstance.post(
        "/api/auth/login"
      )

    } catch (error) {

    }
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

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

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