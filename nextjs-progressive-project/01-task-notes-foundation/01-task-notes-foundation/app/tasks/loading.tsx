import { LoadingSpinner } from "../components/LoadingSpinner";

export default function TasksLoading() {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-4">
      <LoadingSpinner size={36} />
      <p className="text-sm text-[hsl(var(--muted-foreground))]">
        Loading tasks...
      </p>
    </div>
  );
}