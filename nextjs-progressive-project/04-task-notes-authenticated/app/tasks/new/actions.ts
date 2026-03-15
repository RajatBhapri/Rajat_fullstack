"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import { env } from "@/lib/env";

export type CreateTaskState = {
  error?: string;
};

export async function createTaskAction(
  _prevState: CreateTaskState,
  formData: FormData,
): Promise<CreateTaskState> {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const priority = String(formData.get("priority") || "medium") as
    | "low"
    | "medium"
    | "high";

  if (!title) {
    return { error: "Task title is required." };
  }

  if (title.length < 3) {
    return { error: "Task title must be at least 3 characters." };
  }

  if (!["low", "medium", "high"].includes(priority)) {
    return { error: "Invalid priority selected." };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(env.AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return { error: "You are not logged in." };
  }

  try {
    await api.createTask(
      {
        title,
        description,
        priority,
        completed: false,
        status: "pending",
      },
      { authToken: token },
    );
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to create task.",
    };
  }

  revalidatePath("/tasks");
  redirect("/tasks");
}