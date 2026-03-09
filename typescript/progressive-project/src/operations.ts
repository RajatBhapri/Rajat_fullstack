import type { Task, Priority } from "./types.js";

export function createTask(title: string, priority: Priority = "medium"): Task {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    priority,
    createdAt: new Date(),
  };
}

export function markCompleted(task: Task): Task {
  return { ...task, completed: true };
}

export function filterByStatus(tasks: Task[], status: boolean): Task[] {
  return tasks.filter((t) => t.completed === status);
}

export function sortByPriority(tasks: Task[]): Task[] {
  const order = { low: 1, medium: 2, high: 3 };
  return [...tasks].sort((a, b) => order[a.priority] - order[b.priority]);
}
