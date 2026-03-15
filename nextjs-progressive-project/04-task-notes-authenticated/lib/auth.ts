"use client";

import { env } from "@/lib/env";

const AUTH_CHANGED_EVENT = "task-notes-auth-changed";

export function getClientAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(env.AUTH_TOKEN_STORAGE_KEY);
}

export function getClientAuthEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(env.AUTH_EMAIL_STORAGE_KEY);
}

export async function setClientSession(token: string, email?: string) {
  if (typeof window === "undefined") return;

  localStorage.setItem(env.AUTH_TOKEN_STORAGE_KEY, token);

  if (email) {
    localStorage.setItem(env.AUTH_EMAIL_STORAGE_KEY, email);
  }

  await fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export async function clearClientSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(env.AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(env.AUTH_EMAIL_STORAGE_KEY);

  await fetch("/api/session", {
    method: "DELETE",
  });

  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function subscribeToAuthChange(callback: () => void) {
  const handler = () => callback();

  window.addEventListener("storage", handler);
  window.addEventListener(AUTH_CHANGED_EVENT, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(AUTH_CHANGED_EVENT, handler);
  };
}
