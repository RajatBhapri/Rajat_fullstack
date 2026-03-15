"use client";

export default function TasksError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-red-700">
        Something went wrong in the tasks section
      </h2>
      <p className="mt-2 text-sm text-red-600">{error.message}</p>

      <button
        onClick={reset}
        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
}
