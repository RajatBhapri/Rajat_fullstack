"use client";

import { useEffect, useMemo, useOptimistic, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageTransition from "./PageTransition";
import { AnimatedTaskCard } from "./AnimatedTaskCard";
import { PreferencesPanel } from "./PreferencesPanel";
import { Button } from "@/components/ui/button";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import type { Task } from "@/lib/types";
import {
  bulkDeleteTasksAction,
  bulkUpdateTaskCompletionAction,
  deleteTaskAction,
  toggleTaskCompletionAction,
} from "@/app/tasks/actions";

interface TasksPageClientProps {
  initialTasks: Task[];
}

const TASK_ORDER_STORAGE_KEY = "task_notes_task_order";

function reorderTasks(tasks: Task[], draggedId: string, targetId: string) {
  const draggedIndex = tasks.findIndex((task) => task.id === draggedId);
  const targetIndex = tasks.findIndex((task) => task.id === targetId);

  if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) {
    return tasks;
  }

  const updated = [...tasks];
  const [draggedTask] = updated.splice(draggedIndex, 1);
  updated.splice(targetIndex, 0, draggedTask);
  return updated;
}

function applyStoredOrder(tasks: Task[]) {
  if (typeof window === "undefined") return tasks;

  try {
    const stored = localStorage.getItem(TASK_ORDER_STORAGE_KEY);
    if (!stored) return tasks;

    const orderedIds = JSON.parse(stored) as string[];
    const taskMap = new Map(tasks.map((task) => [task.id, task]));
    const orderedTasks: Task[] = [];

    orderedIds.forEach((id) => {
      const task = taskMap.get(id);
      if (task) {
        orderedTasks.push(task);
        taskMap.delete(id);
      }
    });

    return [...orderedTasks, ...Array.from(taskMap.values())];
  } catch {
    return tasks;
  }
}

export function TasksPageClient({ initialTasks }: TasksPageClientProps) {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [pageError, setPageError] = useState("");
  const [search, setSearch] = useState("");
  const [busyTaskId, setBusyTaskId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverTaskId, setDragOverTaskId] = useState<string | null>(null);
  const [bulkActionLoading, startBulkTransition] = useTransition();
  const [toggleLoading, startToggleTransition] = useTransition();
  const [deleteLoading, startDeleteTransition] = useTransition();
  const { preferences } = useUserPreferences();

  useEffect(() => {
    setTasks(applyStoredOrder(initialTasks));
  }, [initialTasks]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(
        TASK_ORDER_STORAGE_KEY,
        JSON.stringify(tasks.map((task) => task.id)),
      );
    } catch {
      // ignore storage errors
    }
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const passesCompletedFilter =
        preferences.showCompletedTasks || !task.completed;

      const passesSearch =
        normalizedSearch.length === 0 ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        (task.description ?? "").toLowerCase().includes(normalizedSearch) ||
        task.priority.toLowerCase().includes(normalizedSearch);

      return passesCompletedFilter && passesSearch;
    });
  }, [tasks, preferences.showCompletedTasks, search]);

  const handleToggleComplete = (taskId: string) => {
    setPageError("");

    const existingTask = tasks.find((task) => task.id === taskId);
    if (!existingTask) return;

    const nextCompleted = !existingTask.completed;
    setBusyTaskId(taskId);

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

    startToggleTransition(async () => {
      try {
        await toggleTaskCompletionAction(taskId, nextCompleted);
        router.refresh();
      } catch (error) {
        setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? existingTask : task)),
        );
        setPageError(
          error instanceof Error ? error.message : "Failed to update task.",
        );
      } finally {
        setBusyTaskId(null);
      }
    });
  };

  const handleDeleteRequest = (task: Task) => {
    setDeleteTarget(task);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    setPageError("");
    const snapshot = tasks;
    setBusyTaskId(deleteTarget.id);
    setTasks((prev) => prev.filter((task) => task.id !== deleteTarget.id));

    startDeleteTransition(async () => {
      try {
        await deleteTaskAction(deleteTarget.id);
        setSelectedTaskIds((prev) => prev.filter((id) => id !== deleteTarget.id));
        setDeleteTarget(null);
        router.refresh();
      } catch (error) {
        setTasks(snapshot);
        setPageError(
          error instanceof Error ? error.message : "Failed to delete task.",
        );
      } finally {
        setBusyTaskId(null);
      }
    });
  };

  const handleSelectTask = (taskId: string, checked: boolean) => {
    setSelectedTaskIds((prev) => {
      if (checked) {
        return prev.includes(taskId) ? prev : [...prev, taskId];
      }
      return prev.filter((id) => id !== taskId);
    });
  };

  const handleSelectAllVisible = () => {
    const visibleIds = filteredTasks.map((task) => task.id);

    const allVisibleSelected =
      visibleIds.length > 0 &&
      visibleIds.every((id) => selectedTaskIds.includes(id));

    if (allVisibleSelected) {
      setSelectedTaskIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
      return;
    }

    setSelectedTaskIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
  };

  const handleClearSelection = () => {
    setSelectedTaskIds([]);
  };

  const handleBulkComplete = (completed: boolean) => {
    setPageError("");
    if (selectedTaskIds.length === 0) return;

    const snapshot = tasks;

    setTasks((prev) =>
      prev.map((task) =>
        selectedTaskIds.includes(task.id)
          ? {
              ...task,
              completed,
              status: completed ? "completed" : "pending",
            }
          : task,
      ),
    );

    startBulkTransition(async () => {
      try {
        await bulkUpdateTaskCompletionAction(selectedTaskIds, completed);
        setSelectedTaskIds([]);
        router.refresh();
      } catch (error) {
        setTasks(snapshot);
        setPageError(
          error instanceof Error ? error.message : "Bulk update failed.",
        );
      }
    });
  };

  const handleBulkDelete = () => {
    setPageError("");
    if (selectedTaskIds.length === 0) return;

    const snapshot = tasks;
    setTasks((prev) => prev.filter((task) => !selectedTaskIds.includes(task.id)));

    startBulkTransition(async () => {
      try {
        await bulkDeleteTasksAction(selectedTaskIds);
        setSelectedTaskIds([]);
        router.refresh();
      } catch (error) {
        setTasks(snapshot);
        setPageError(
          error instanceof Error ? error.message : "Bulk delete failed.",
        );
      }
    });
  };

  const handleDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (taskId: string) => {
    setDragOverTaskId(taskId);
  };

  const handleDrop = () => {
    if (!draggedTaskId || !dragOverTaskId) {
      setDraggedTaskId(null);
      setDragOverTaskId(null);
      return;
    }

    setTasks((prev) => reorderTasks(prev, draggedTaskId, dragOverTaskId));
    setDraggedTaskId(null);
    setDragOverTaskId(null);
  };

  const allVisibleSelected =
    filteredTasks.length > 0 &&
    filteredTasks.every((task) => selectedTaskIds.includes(task.id));

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm transition-all duration-300 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[hsl(var(--card-foreground))]">
              Task List
            </h2>
            <p className="mt-2 text-[hsl(var(--muted-foreground))]">
              Search, drag to reorder, select multiple tasks, edit, delete, and manage live backend updates.
            </p>
          </div>

          <Button
            asChild
            className="transition-transform duration-200 hover:scale-[1.02]"
          >
            <Link href="/tasks/new">New Task</Link>
          </Button>
        </div>

        {pageError ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {pageError}
          </div>
        ) : null}

        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-sm">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">
              Search tasks
            </span>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, description, or priority..."
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-sm outline-none transition focus:border-[hsl(var(--primary))]"
            />
          </label>
        </div>

        <PreferencesPanel />

        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" variant="outline" onClick={handleSelectAllVisible}>
                {allVisibleSelected ? "Unselect Visible" : "Select Visible"}
              </Button>

              <Button type="button" variant="outline" onClick={handleClearSelection}>
                Clear Selection
              </Button>

              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                {selectedTaskIds.length} selected
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={selectedTaskIds.length === 0 || bulkActionLoading}
                onClick={() => handleBulkComplete(true)}
              >
                {bulkActionLoading ? "Working..." : "Mark Complete"}
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={selectedTaskIds.length === 0 || bulkActionLoading}
                onClick={() => handleBulkComplete(false)}
              >
                {bulkActionLoading ? "Working..." : "Mark Pending"}
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={selectedTaskIds.length === 0 || bulkActionLoading}
                onClick={handleBulkDelete}
              >
                {bulkActionLoading ? "Working..." : "Delete Selected"}
              </Button>
            </div>
          </div>

          <p className="mt-3 text-xs text-[hsl(var(--muted-foreground))]">
            Drag and drop changes task order only in this browser for now, because the backend does not yet expose a reorder API.
          </p>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              No tasks found
            </h3>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              Try changing your search or create a new task.
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
                isBusy={busyTaskId === task.id}
                isSelected={selectedTaskIds.includes(task.id)}
                isDragging={draggedTaskId === task.id || dragOverTaskId === task.id}
                onSelect={handleSelectTask}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteRequest}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            ))}
          </div>
        )}

        {deleteTarget ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                Delete task
              </h3>
              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                Are you sure you want to delete “{deleteTarget.title}”? This action cannot be undone.
              </p>

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={handleDeleteConfirm}
                  disabled={deleteLoading}
                  className="flex-1"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  disabled={deleteLoading}
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </PageTransition>
  );
}