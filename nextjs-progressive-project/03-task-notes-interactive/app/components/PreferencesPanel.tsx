"use client";

import { useUserPreferences } from "@/hooks/useUserPreferences";
import { ColorPicker } from "./ColorPicker";
import { CustomButton } from "@/components/ui/custom-button";

export function PreferencesPanel() {
  const { preferences, updatePreference } = useUserPreferences();

  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">
        UI Preferences
      </h2>

      <div className="mt-6 space-y-6">
        <div>
          <p className="mb-3 text-sm font-medium text-[hsl(var(--foreground))]">
            Accent Color
          </p>
          <ColorPicker
            value={preferences.accentColor}
            onChange={(value) => updatePreference("accentColor", value)}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <CustomButton
            type="button"
            intent={preferences.compactMode ? "success" : "warning"}
            glow
            onClick={() =>
              updatePreference("compactMode", !preferences.compactMode)
            }
          >
            {preferences.compactMode ? "Compact Mode On" : "Compact Mode Off"}
          </CustomButton>

          <CustomButton
            type="button"
            intent={preferences.showCompletedTasks ? "success" : "danger"}
            onClick={() =>
              updatePreference(
                "showCompletedTasks",
                !preferences.showCompletedTasks,
              )
            }
          >
            {preferences.showCompletedTasks
              ? "Hide Completed Tasks"
              : "Show Completed Tasks"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
