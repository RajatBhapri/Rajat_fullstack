import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TasksPageClient } from "../components/TasksPageClient";
import { api } from "@/lib/api";
import { getServerAuthToken } from "@/lib/server-auth";
import type { Task } from "@/lib/types";

export const metadata: Metadata = {
  title: "Tasks",
  description: "View all tasks in the Task Notes application.",
};

export default async function TasksPage() {
  const token = await getServerAuthToken();

  if (!token) {
    redirect("/login?next=/tasks");
  }

  let tasks: Task[] = [];

  try {
    tasks = await api.getTasks({ authToken: token });
  } catch (error) {
    console.error("Failed to load tasks:", error);
    throw error;
  }

  return <TasksPageClient initialTasks={tasks} />;
}
