import Link from "next/link";

export default function TaskNotFoundPage() {
  return (
    <section className="mx-auto max-w-xl rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">
        Task not found
      </h1>

      <p className="mt-3 text-[hsl(var(--muted-foreground))]">
        The task you are looking for does not exist, or it may have been deleted.
      </p>

      <div className="mt-6">
        <Link
          href="/tasks"
          className="inline-flex rounded-lg bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition hover:opacity-90"
        >
          Back to Tasks
        </Link>
      </div>
    </section>
  );
}
