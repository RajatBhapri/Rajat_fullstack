import { cookies } from "next/headers";
import { env } from "@/lib/env";
import type { Task, CreateTaskInput, UpdateTaskInput } from "@/lib/types";

const API_BASE = env.API_URL;

async function authenticatedRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get(env.AUTH_COOKIE_NAME)?.value;

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    throw new Error("Authentication required");
  }

  if (!response.ok) {
    let message = `API Error: ${response.statusText}`;

    try {
      const body = (await response.json()) as { message?: string; error?: string };
      message = body.message || body.error || message;
    } catch {
      // ignore parse failure
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const apiClient = {
  getTasks: () => authenticatedRequest<Task[]>("/api/tasks"),

  getTask: (id: string) => authenticatedRequest<Task>(`/api/tasks/${id}`),

  createTask: (task: CreateTaskInput) =>
    authenticatedRequest<Task>("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    }),

  updateTask: (id: string, updates: UpdateTaskInput) =>
    authenticatedRequest<Task>(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    }),

  deleteTask: (id: string) =>
    authenticatedRequest<void>(`/api/tasks/${id}`, {
      method: "DELETE",
    }),
};