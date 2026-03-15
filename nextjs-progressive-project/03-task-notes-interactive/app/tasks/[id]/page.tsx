import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { api } from "@/lib/api";
import { getServerAuthToken } from "@/lib/server-auth";
import type { Task } from "@/lib/types";

interface TaskDetailPageProps {
  params: Promise<{ id: string }>;
}

function getPriorityClasses(priority: Task["priority"]) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
    default:
      return "bg-green-100 text-green-800";
  }
}

export async function generateMetadata({
  params,
}: TaskDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const token = await getServerAuthToken();

  if (!token) {
    return {
      title: "Login Required - Task Notes",
    };
  }

  try {
    const task = await api.getTask(id, { authToken: token });

    return {
      title: `${task.title} - Task Notes`,
      description: task.description || `Task details for ${task.title}`,
    };
  } catch {
    return {
      title: "Task Not Found - Task Notes",
    };
  }
}

export default async function TaskDetailPage({
  params,
}: TaskDetailPageProps) {
  const { id } = await params;
  const token = await getServerAuthToken();

  if (!token) {
    redirect(`/login?next=/tasks/${id}`);
  }

  let task: Task;

  try {
    task = await api.getTask(id, { authToken: token });
  } catch {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          href="/tasks"
          className="text-sm font-medium text-[hsl(var(--primary))] hover:underline"
        >
          ← Back to Tasks
        </Link>
      </div>

      <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
              {task.title}
            </h1>

            {task.description ? (
              <p className="text-[hsl(var(--muted-foreground))]">
                {task.description}
              </p>
            ) : (
              <p className="text-[hsl(var(--muted-foreground))]">
                No description added for this task.
              </p>
            )}
          </div>

          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
              task.completed
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <div className="mt-6 grid gap-4 rounded-xl bg-[hsl(var(--secondary))] p-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
              Priority
            </p>
            <span
              className={`mt-2 inline-flex rounded-md px-2.5 py-1 text-sm font-medium ${getPriorityClasses(
                task.priority,
              )}`}
            >
              {task.priority}
            </span>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
              Status
            </p>
            <p className="mt-2 text-sm text-[hsl(var(--foreground))]">
              {task.status ?? (task.completed ? "completed" : "pending")}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
              Created At
            </p>
            <p className="mt-2 text-sm text-[hsl(var(--foreground))]">
              {new Date(task.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
              Updated At
            </p>
            <p className="mt-2 text-sm text-[hsl(var(--foreground))]">
              {task.updatedAt
                ? new Date(task.updatedAt).toLocaleString()
                : "Not available"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/tasks/${task.id}/edit`}
            className="inline-flex rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition hover:opacity-90"
          >
            Edit Task
          </Link>

          <Link
            href="/tasks"
            className="inline-flex rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2 text-sm font-semibold text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--accent))]"
          >
            Back to list
          </Link>
        </div>
      </div>
    </section>
  );
}
