export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "pending" | "completed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TaskPriority;
  status?: TaskStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  completed?: boolean;
  priority: TaskPriority;
  status?: TaskStatus;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: TaskPriority;
  status?: TaskStatus;
}

export interface ApiError extends Error {
  status?: number;
}

export interface AuthUser {
  id?: string | number;
  email: string;
}

export interface AuthResponse {
  token?: string;
  user?: AuthUser;
  message?: string;
  error?: string;
}
