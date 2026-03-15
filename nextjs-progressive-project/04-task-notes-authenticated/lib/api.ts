import { env } from "@/lib/env";
import type {
  ApiError,
  AuthResponse,
  CreateTaskInput,
  Task,
  UpdateTaskInput,
} from "@/lib/types";

const API_BASE = env.API_URL;

type ApiRequestOptions = RequestInit & {
  authToken?: string;
  timeoutMs?: number;
};

async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { timeoutMs = 10000, authToken, headers, ...restOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...restOptions,
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...headers,
      },
      signal: controller.signal,
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    let data: unknown = undefined;

    if (isJson) {
      try {
        data = await response.json();
      } catch {
        data = undefined;
      }
    }

    if (response.status === 401) {
      const error = new Error("Authentication required.") as ApiError;
      error.status = 401;
      throw error;
    }

    if (!response.ok) {
      const body = data as { message?: string; error?: string } | undefined;
      const message =
        body?.message ||
        body?.error ||
        `API Error: ${response.status} ${response.statusText}`;

      const error = new Error(message) as ApiError;
      error.status = response.status;
      throw error;
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return data as T;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      const timeoutError = new Error(
        "Request timed out. Please check your backend server.",
      ) as ApiError;
      timeoutError.status = 408;
      throw timeoutError;
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unknown API error");
  } finally {
    clearTimeout(timeoutId);
  }
}

export const api = {
  auth: {
    login: (input: { email: string; password: string }): Promise<AuthResponse> =>
      apiRequest<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(input),
      }),

    register: (input: {
      email: string;
      password: string;
    }): Promise<AuthResponse> =>
      apiRequest<AuthResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(input),
      }),
  },

  getTasks: (options?: { authToken?: string }): Promise<Task[]> =>
    apiRequest<Task[]>("/api/tasks", {
      authToken: options?.authToken,
    }),

  getTask: (id: string, options?: { authToken?: string }): Promise<Task> =>
    apiRequest<Task>(`/api/tasks/${id}`, {
      authToken: options?.authToken,
    }),

  createTask: (
    input: CreateTaskInput,
    options?: { authToken?: string },
  ): Promise<Task> =>
    apiRequest<Task>("/api/tasks", {
      method: "POST",
      body: JSON.stringify(input),
      authToken: options?.authToken,
    }),

  updateTask: (
    id: string,
    input: UpdateTaskInput,
    options?: { authToken?: string },
  ): Promise<Task> =>
    apiRequest<Task>(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
      authToken: options?.authToken,
    }),

  deleteTask: (id: string, options?: { authToken?: string }): Promise<void> =>
    apiRequest<void>(`/api/tasks/${id}`, {
      method: "DELETE",
      authToken: options?.authToken,
    }),
};