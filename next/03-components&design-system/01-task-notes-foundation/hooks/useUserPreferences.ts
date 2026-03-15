"use client";

import { useEffect, useState } from "react";

export interface UserPreferences {
  theme: "light" | "dark";
  compactMode: boolean;
  showCompletedTasks: boolean;
  taskSortOrder: "date" | "priority" | "title";
  accentColor: string;
}

const defaultPreferences: UserPreferences = {
  theme: "light",
  compactMode: false,
  showCompletedTasks: true,
  taskSortOrder: "date",
  accentColor: "221 83% 53%",
};

const STORAGE_KEY = "userPreferences";
const PREFERENCES_UPDATED_EVENT = "user-preferences-updated";

function loadPreferences(): UserPreferences {
  if (typeof window === "undefined") return defaultPreferences;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultPreferences;

    return { ...defaultPreferences, ...JSON.parse(saved) };
  } catch {
    return defaultPreferences;
  }
}

export function useUserPreferences() {
  const [preferences, setPreferences] =
    useState<UserPreferences>(loadPreferences);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary",
      preferences.accentColor,
    );
  }, [preferences.accentColor]);

  useEffect(() => {
    const syncPreferences = () => {
      setPreferences(loadPreferences());
    };

    window.addEventListener("storage", syncPreferences);
    window.addEventListener(PREFERENCES_UPDATED_EVENT, syncPreferences);

    return () => {
      window.removeEventListener("storage", syncPreferences);
      window.removeEventListener(PREFERENCES_UPDATED_EVENT, syncPreferences);
    };
  }, []);

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K],
  ) => {
    setPreferences((prev) => {
      const updated = { ...prev, [key]: value };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(PREFERENCES_UPDATED_EVENT));

      return updated;
    });
  };

  return {
    preferences,
    updatePreference,
  };
}
