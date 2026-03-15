"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.error("Global error:", error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-zinc-950">
          <div className="w-full max-w-md text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Something went wrong!
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              We&apos;re sorry, but something unexpected happened.
            </p>
            <div className="space-x-4">
              <button
                onClick={reset}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="inline-block rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}