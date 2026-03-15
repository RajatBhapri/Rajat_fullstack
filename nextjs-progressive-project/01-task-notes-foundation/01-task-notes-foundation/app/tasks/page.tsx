import type { Metadata } from "next";
import type { Task } from "@/lib/types";
import { TasksPageClient } from "../components/TasksPageClient";

export const metadata: Metadata = {
  title: "Tasks",
  description: "View all tasks in the Task Notes application.",
};

const placeholderTasks: Task[] = [
  {
    id: "1",
    title: "Finish Next.js foundation setup",
    description: "Complete layouts, theming, and shared UI.",
    priority: "high",
    completed: true,
    status: "completed",
    createdAt: "20/12/2000",
  },
  {
    id: "2",
    title: "Connect tasks page to backend API",
    description: "Fetch task data from the Node Task Notes API.",
    priority: "medium",
    status: "pending",
    completed: false,
    createdAt: "20/09/2016",
  },
  {
    id: "3",
    title: "Add create and edit task forms",
    description: "Use React Hook Form and polished components.",
    priority: "low",
    status: "completed",
    completed: true,
    createdAt: "27/04/2020",
  },
];

export default function TasksPage() {
  return <TasksPageClient initialTasks={placeholderTasks} />;
}
