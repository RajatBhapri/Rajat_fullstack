"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong
      </h1>

      <p className="mb-4">{error.message}</p>

      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}
