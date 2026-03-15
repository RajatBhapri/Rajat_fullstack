import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Task } from "@/lib/types";

interface TaskCardProps {
  task: Task;
  compact?: boolean;
  onToggleComplete: (taskId: string) => void;
}

export function TaskCard({
  task,
  compact = false,
  onToggleComplete,
}: TaskCardProps) {
  const priorityColors: Record<"low" | "medium" | "high", string> = {
    low: "bg-green-100 text-green-800 hover:bg-green-200",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    high: "bg-red-100 text-red-800 hover:bg-red-200",
  };

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className={compact ? "pb-2" : "pb-4"}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h3
              className={`font-semibold leading-none tracking-tight ${
                compact ? "text-base" : "text-lg"
              }`}
            >
              {task.title}
            </h3>

            <p className="text-sm text-muted-foreground">
              Created {new Date(task.createdAt).toLocaleDateString()}
            </p>

            {task.description ? (
              <p className="pt-1 text-sm text-muted-foreground">
                {task.description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className={priorityColors[task.priority]}
            >
              {task.priority}
            </Badge>

            <Badge variant={task.completed ? "default" : "outline"}>
              {task.completed ? "Completed" : "Pending"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className={compact ? "pt-3" : "pt-4"}>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            variant={task.completed ? "outline" : "default"}
            size="sm"
            onClick={() => onToggleComplete(task.id)}
          >
            {task.completed ? "Mark Pending" : "Mark Complete"}
          </Button>

          <Button variant="outline" size="sm" asChild>
            <Link href={`/tasks/${task.id}`}>View Details</Link>
          </Button>

          <Button variant="outline" size="sm" asChild>
            <Link href={`/tasks/${task.id}/edit`}>Edit</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
