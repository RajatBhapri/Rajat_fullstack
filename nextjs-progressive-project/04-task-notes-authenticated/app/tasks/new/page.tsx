import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageTransition from "../../components/PageTransition";
import { env } from "@/lib/env";
import NewTaskForm from "./task-form";

export default async function NewTaskPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(env.AUTH_COOKIE_NAME)?.value;

  if (!token) {
    redirect("/login");
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
            <NewTaskForm />
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}