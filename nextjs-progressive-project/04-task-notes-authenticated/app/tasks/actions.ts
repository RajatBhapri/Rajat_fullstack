"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import { env } from "@/lib/env";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get(env.AUTH_COOKIE_NAME)?.value;
}

export async function updateTaskAction(
  id: string,
  _prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const token = await getAuthToken();

  if (!token) {
    return { error: "You are not logged in." };
  }

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const priority = String(formData.get("priority") || "medium") as
    | "low"
    | "medium"
    | "high";
  const completed = formData.get("completed") === "on";

  if (!title) {
    return { error: "Task title is required." };
  }

  if (title.length < 3) {
    return { error: "Task title must be at least 3 characters." };
  }

  try {
    await api.updateTask(
      id,
      {
        title,
        description,
        priority,
        completed,
        status: completed ? "completed" : "pending",
      },
      { authToken: token },
    );
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update task.",
    };
  }

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);
  redirect(`/tasks/${id}`);
}

export async function toggleTaskCompletionAction(
  id: string,
  completed: boolean,
) {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("You are not logged in.");
  }

  await api.updateTask(
    id,
    {
      completed,
      status: completed ? "completed" : "pending",
    },
    { authToken: token },
  );

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);
}

export async function deleteTaskAction(id: string) {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("You are not logged in.");
  }

  await api.deleteTask(id, { authToken: token });

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);
}

export async function bulkUpdateTaskCompletionAction(
  ids: string[],
  completed: boolean,
) {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("You are not logged in.");
  }

  await Promise.all(
    ids.map((id) =>
      api.updateTask(
        id,
        {
          completed,
          status: completed ? "completed" : "pending",
        },
        { authToken: token },
      ),
    ),
  );

  revalidatePath("/tasks");
}

export async function bulkDeleteTasksAction(ids: string[]) {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("You are not logged in.");
  }

  await Promise.all(ids.map((id) => api.deleteTask(id, { authToken: token })));

  revalidatePath("/tasks");
}