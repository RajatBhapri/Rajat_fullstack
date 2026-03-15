import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageTransition from "../../components/PageTransition";
import TaskForm from "./task-form";

export default function NewTaskPage() {
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
            <TaskForm />
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
