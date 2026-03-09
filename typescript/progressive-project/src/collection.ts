import type { Task, Priority } from "./types.js";

export interface TaskCollection {
  tasks: Task[];
  metadata: {
    total: number;
    completed: number;
    lastModified: Date;
  };
}

export interface TaskStats {
  byPriority: Record<Priority, number>;
  byStatus: Record<string, number>;
  averageAge: number;
}
