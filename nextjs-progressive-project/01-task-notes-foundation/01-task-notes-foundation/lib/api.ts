const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: "low" | "medium" | "high";
}

export interface ApiError extends Error {
  status?: number;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const error = new Error(
        `API Error: ${response.status} ${response.statusText}`,
      ) as ApiError;
      error.status = response.status;
      throw error;
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const data = (await response.json()) as T;
    console.log(`API ${options.method || "GET"} ${endpoint}:`, data);
    return data;
  } catch (error) {
    console.error(`API Request failed for ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  getTasks: (): Promise<Task[]> => apiRequest<Task[]>("/api/tasks"),

  getTask: (id: string): Promise<Task> => apiRequest<Task>(`/api/tasks/${id}`),

  createTask: (task: CreateTaskInput): Promise<Task> =>
    apiRequest<Task>("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    }),

  updateTask: (id: string, updates: UpdateTaskInput): Promise<Task> =>
    apiRequest<Task>(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    }),

  deleteTask: (id: string): Promise<void> =>
    apiRequest<void>(`/api/tasks/${id}`, {
      method: "DELETE",
    }),
};
