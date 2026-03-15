"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import PageTransition from "./PageTransition";
import { AnimatedTaskCard } from "./AnimatedTaskCard";
import { PreferencesPanel } from "./PreferencesPanel";
import { Button } from "@/components/ui/button";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { api } from "@/lib/api";
import { getClientAuthToken } from "@/lib/auth";
import type { Task } from "@/lib/types";

interface TasksPageClientProps {
  initialTasks: Task[];
}

export function TasksPageClient({ initialTasks }: TasksPageClientProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { preferences } = useUserPreferences();

  const handleToggleComplete = async (taskId: string) => {
    const token = getClientAuthToken();

    if (!token) {
      toast.error("Please login again.");
      return;
    }

    const existingTask = tasks.find((task) => task.id === taskId);

    if (!existingTask) return;

    const nextCompleted = !existingTask.completed;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: nextCompleted,
              status: nextCompleted ? "completed" : "pending",
            }
          : task,
      ),
    );

    try {
      const updatedTask = await api.updateTask(
        taskId,
        {
          completed: nextCompleted,
          status: nextCompleted ? "completed" : "pending",
        },
        {
          authToken: token,
        },
      );

      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task)),
      );
    } catch (error) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? existingTask : task,
        ),
      );

      toast.error(
        error instanceof Error ? error.message : "Failed to update task.",
      );
    }
  };

  const filteredTasks = useMemo(() => {
    if (preferences.showCompletedTasks) {
      return tasks;
    }

    return tasks.filter((task) => !task.completed);
  }, [tasks, preferences.showCompletedTasks]);

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm transition-all duration-300 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[hsl(var(--card-foreground))]">
              Task List
            </h2>
            <p className="mt-2 text-[hsl(var(--muted-foreground))]">
              This page now includes animations, preferences, and protected API
              task updates.
            </p>
          </div>

          <Button
            asChild
            className="transition-transform duration-200 hover:scale-[1.02]"
          >
            <Link href="/tasks/new">New Task</Link>
          </Button>
        </div>

        <PreferencesPanel />

        {filteredTasks.length === 0 ? (
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              No tasks to show
            </h3>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              Try enabling completed tasks or create a new one.
            </p>
          </div>
        ) : (
          <div className={preferences.compactMode ? "grid gap-3" : "grid gap-4"}>
            {filteredTasks.map((task, index) => (
              <AnimatedTaskCard
                key={task.id}
                task={task}
                index={index}
                compact={preferences.compactMode}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}