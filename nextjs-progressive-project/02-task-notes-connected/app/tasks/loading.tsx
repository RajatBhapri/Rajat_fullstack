// import { LoadingSpinner } from "../components/LoadingSpinner";

// export default function TasksLoading() {
//   return (
//     <div className="flex min-h-[240px] flex-col items-center justify-center gap-4">
//       <LoadingSpinner size={36} />
//       <p className="text-sm text-[hsl(var(--muted-foreground))]">
//         Loading tasks...
//       </p>
//     </div>
//   );
// }


import { LoadingSpinner } from "../components/LoadingSpinner";

export default function TasksLoading() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
        <div className="space-y-3">
          <div className="h-7 w-40 animate-pulse rounded bg-[hsl(var(--secondary))]" />
          <div className="h-4 w-64 animate-pulse rounded bg-[hsl(var(--secondary))]" />
        </div>

        <div className="flex items-center gap-3">
          <LoadingSpinner size={24} />
          <span className="text-sm text-[hsl(var(--muted-foreground))]">
            Loading tasks...
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm"
          >
            <div className="space-y-4">
              <div className="h-6 w-1/3 animate-pulse rounded bg-[hsl(var(--secondary))]" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-[hsl(var(--secondary))]" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-[hsl(var(--secondary))]" />

              <div className="flex gap-3 pt-2">
                <div className="h-9 w-28 animate-pulse rounded bg-[hsl(var(--secondary))]" />
                <div className="h-9 w-24 animate-pulse rounded bg-[hsl(var(--secondary))]" />
                <div className="h-9 w-20 animate-pulse rounded bg-[hsl(var(--secondary))]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}