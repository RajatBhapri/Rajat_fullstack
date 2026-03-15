import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type TaskDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: TaskDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Task ${id}`,
    description: `View details for task ${id} in Task Notes.`,
  };
}

export default async function TaskDetailPage({
  params,
}: TaskDetailPageProps) {
  const { id } = await params;

  if (id === "404") {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Task Details</h2>
        <p className="mt-2 text-[hsl(var(--muted-foreground))]">
          This is a placeholder page for task ID: {id}
        </p>
      </div>

      <Link
        href="/tasks"
        className="inline-block rounded-lg bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))]"
      >
        Back to Tasks
      </Link>
    </div>
  );
}