import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageTransition from "../../components/PageTransition";
import { TaskEditorForm } from "../../components/TaskEditorForm";
import { getServerAuthToken } from "@/lib/server-auth";

export default async function NewTaskPage() {
  const token = await getServerAuthToken();

  if (!token) {
    redirect("/login?next=/tasks/new");
  }

  return (
    <PageTransition>
      <div className="container mx-auto max-w-2xl p-8">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1>Create New Task</h1>
            </CardTitle>
            <CardDescription>
              Add a new task to your list with priority and details.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <TaskEditorForm mode="create" />
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
