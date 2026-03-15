"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { User } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readUserCookie(): User | null {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user="));

  if (!cookie) return null;

  try {
    const raw = cookie.split("=")[1];
    return JSON.parse(decodeURIComponent(raw)) as User;
  } catch {
    return null;
  }
}

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isClient = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const [user, setUser] = useState<User | null>(() =>
    typeof document === "undefined" ? null : readUserCookie(),
  );

  const logout = async () => {
    const response = await fetch("/api/auth/logout", { method: "POST" });

    if (response.ok) {
      setUser(null);
      window.location.href = "/login";
    }
  };

  const value = useMemo(
    () => ({
      user: isClient ? user : null,
      loading: !isClient,
      logout,
    }),
    [user, isClient],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}