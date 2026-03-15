import { useEffect, useMemo, useState } from "react";
import type { CreateTaskInput, Task, UpdateTaskInput } from "../types/task";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_TOKEN = import.meta.env.VITE_API_TOKEN || "";

type FilterStatus = "all" | "completed" | "pending";

function getHeaders(hasBody = false): HeadersInit {
  const headers: HeadersInit = {};

  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }

  if (API_TOKEN) {
    headers["Authorization"] = `Bearer ${API_TOKEN}`;
  }

  return headers;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState<string>("");

  async function fetchTasks() {
    console.log("fetchTasks started");
    console.log("API_URL:", API_URL);
    console.log("API_TOKEN:", API_TOKEN);

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`http://localhost:3000/api/tasks`, {
        headers: getHeaders(),
      });

      console.log("fetchTasks response status:", response.status);

      const text = await response.text();
      console.log("fetchTasks response text:", text);

      if (!response.ok) {
        throw new Error(text || "Failed to fetch tasks");
      }

      const data: Task[] = JSON.parse(text);
      setTasks(data);
    } catch (err) {
      console.log("fetchTasks error:", err);
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      console.log("fetchTasks finished");
      setLoading(false);
    }
  }

  async function addTask(input: CreateTaskInput) {
    console.log("addTask started");
    console.log("input:", input);
    console.log("API_URL:", API_URL);
    console.log("API_TOKEN:", API_TOKEN);

    try {
      setSubmitting(true);
      setError("");

      const response = await fetch(`http://localhost:3000/api/tasks`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(input),
      });

      console.log("response received");
      console.log("response status:", response.status);

      const text = await response.text();
      console.log("response text:", text);

      if (!response.ok) {
        throw new Error(text || "Failed to create task");
      }

      const newTask: Task = JSON.parse(text);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      console.log("addTask error:", err);
      const message =
        err instanceof Error ? err.message : "Failed to create task";
      setError(message);
      throw err;
    } finally {
      console.log("addTask finished");
      setSubmitting(false);
    }
  }

  async function updateTask(id: string, updates: UpdateTaskInput) {
    try {
      setError("");

      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: getHeaders(true),
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to update task");
      }

      const updatedTask: Task = await response.json();

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task)),
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update task";
      setError(message);
      throw err;
    }
  }

  async function deleteTask(id: string) {
    try {
      setError("");

      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to delete task");
      }

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete task";
      setError(message);
      throw err;
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description || "").toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "completed"
            ? task.completed
            : !task.completed;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  return {
    tasks,
    filteredTasks,
    loading,
    submitting,
    error,
    filter,
    search,
    setFilter,
    setSearch,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };
}
