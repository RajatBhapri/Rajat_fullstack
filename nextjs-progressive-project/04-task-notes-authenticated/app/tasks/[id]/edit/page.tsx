import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageTransition from "../../../components/PageTransition";
import { TaskEditorForm } from "../../../components/TaskEditorForm";
import { api } from "@/lib/api";
import { env } from "@/lib/env";
import type { Task } from "@/lib/types";

interface EditTaskPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get(env.AUTH_COOKIE_NAME)?.value;

  if (!token) {
    redirect("/login");
  }

  let task: Task;

  try {
    task = await api.getTask(id, { authToken: token });
  } catch {
    notFound();
  }

  return (
    <PageTransition>
      <div className="container mx-auto max-w-2xl p-8">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1>Edit Task</h1>
            </CardTitle>
            <CardDescription>
              Update your task title, description, priority, or completion state.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <TaskEditorForm task={task} />
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}