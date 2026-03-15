export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  status: TaskStatus;
  createdAt: string;
}

export type TaskStatus = "pending" | "completed";
export type TaskPriority = "low" | "medium" | "high";

// export interface Task {
//   id: string;
//   title: string;
//   description?: string;
//   priority: TaskPriority;
//   status: TaskStatus;
//   createdAt?: string;
// }
