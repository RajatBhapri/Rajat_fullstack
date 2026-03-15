"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageTransition from "./PageTransition";
import { AnimatedTaskCard } from "./AnimatedTaskCard";
import { PreferencesPanel } from "./PreferencesPanel";
import { Button } from "@/components/ui/button";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import type { Task } from "@/lib/types";

interface TasksPageClientProps {
  initialTasks: Task[];
}

export function TasksPageClient({ initialTasks }: TasksPageClientProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { preferences } = useUserPreferences();

  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              status: !task.completed ? "completed" : "pending",
            }
          : task,
      ),
    );
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
              This page now includes animations, preferences, and richer task
              interactions.
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
      </div>
    </PageTransition>
  );
}
