import type { Task } from "./types.js";
import type { TaskCollection, TaskStats } from "./collection.js";

export class TaskManager {
  private tasks = new Map<string, Task>();

  constructor(initialTasks: Task[] = []) {
    initialTasks.forEach((t) => this.tasks.set(t.id, t));
  }

  add(task: Omit<Task, "id" | "createdAt">): Task {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    this.tasks.set(newTask.id, newTask);
    return newTask;
  }

  update(id: string, updates: Partial<Task>): Task {
    const task = this.tasks.get(id);
    if (!task) throw new Error("Task not found");
    const updated = { ...task, ...updates };
    this.tasks.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.tasks.delete(id);
  }

  getStats(): TaskStats {
    const tasks = [...this.tasks.values()];
    const byPriority = { low: 0, medium: 0, high: 0 };
    const byStatus: Record<"completed" | "pending", number> = {
      completed: 0,
      pending: 0,
    };

    tasks.forEach((t) => {
      byPriority[t.priority]++;
      t.completed ? byStatus.completed++ : byStatus.pending++;
    });

    return { byPriority, byStatus, averageAge: 0 };
  }

  export(): TaskCollection {
    const tasks = [...this.tasks.values()];
    return {
      tasks,
      metadata: {
        total: tasks.length,
        completed: tasks.filter((t) => t.completed).length,
        lastModified: new Date(),
      },
    };
  }
}
