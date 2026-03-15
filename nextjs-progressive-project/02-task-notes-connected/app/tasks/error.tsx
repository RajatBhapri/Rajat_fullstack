"use client";

import { useEffect } from "react";

export default function TasksErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Tasks page error:", error);
  }, [error]);

  return (
    <div className="p-8">
      <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-red-800">
          Something went wrong
        </h2>

        <p className="mt-3 text-sm text-red-700">
          There was a problem loading your tasks. This may be a network issue,
          backend server issue, or invalid API response.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition hover:opacity-90"
          >
            Try Again
          </button>

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2 text-sm font-semibold text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--accent))]"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}