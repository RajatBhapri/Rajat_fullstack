import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Task } from "@/lib/types";

interface TaskCardProps {
  task: Task;
  compact?: boolean;
  isBusy?: boolean;
  isSelected?: boolean;
  isDragging?: boolean;
  onSelect?: (taskId: string, checked: boolean) => void;
  onToggleComplete: (taskId: string) => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({
  task,
  compact = false,
  isBusy = false,
  isSelected = false,
  isDragging = false,
  onSelect,
  onToggleComplete,
  onDelete,
}: TaskCardProps) {
  const priorityColors: Record<"low" | "medium" | "high", string> = {
    low: "bg-green-100 text-green-800 hover:bg-green-200",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    high: "bg-red-100 text-red-800 hover:bg-red-200",
  };

  if (compact) {
    return (
      <Card
        className={`transition-shadow hover:shadow-md ${
          isDragging ? "opacity-60 ring-2 ring-[hsl(var(--primary))]" : ""
        }`}
      >
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-start gap-3">
            <div className="pt-0.5">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(event) => onSelect?.(task.id, event.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
                aria-label={`Select ${task.title}`}
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold leading-tight">
                {task.title}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>{new Date(task.createdAt).toLocaleDateString()}</span>

                <Badge className={`px-2 py-0 text-[10px] ${priorityColors[task.priority]}`}>
                  {task.priority}
                </Badge>

                <Badge
                  variant={task.completed ? "default" : "outline"}
                  className="px-2 py-0 text-[10px]"
                >
                  {task.completed ? "Done" : "Pending"}
                </Badge>
              </div>
            </div>

            <Button
              variant={task.completed ? "outline" : "default"}
              size="sm"
              disabled={isBusy}
              className="h-8 px-2 text-xs"
              onClick={() => onToggleComplete(task.id)}
            >
              {isBusy ? "..." : task.completed ? "Undo" : "Done"}
            </Button>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-2 pb-3">
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="outline" size="sm" className="h-8 px-2 text-xs" asChild>
              <Link href={`/tasks/${task.id}`}>View</Link>
            </Button>

            <Button variant="outline" size="sm" className="h-8 px-2 text-xs" asChild>
              <Link href={`/tasks/${task.id}/edit`}>Edit</Link>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2 text-xs"
              disabled={isBusy}
              onClick={() => onDelete(task)}
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`transition-shadow hover:shadow-md ${
        isDragging ? "opacity-60 ring-2 ring-[hsl(var(--primary))]" : ""
      }`}
    >
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="pt-1">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(event) => onSelect?.(task.id, event.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
                aria-label={`Select ${task.title}`}
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-semibold leading-none tracking-tight">
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
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>

            <Badge variant={task.completed ? "default" : "outline"}>
              {task.completed ? "Completed" : "Pending"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          <Button
            variant={task.completed ? "outline" : "default"}
            size="sm"
            disabled={isBusy}
            onClick={() => onToggleComplete(task.id)}
          >
            {isBusy
              ? "Updating..."
              : task.completed
                ? "Mark Pending"
                : "Mark Complete"}
          </Button>

          <Button variant="outline" size="sm" asChild>
            <Link href={`/tasks/${task.id}`}>View Details</Link>
          </Button>

          <Button variant="outline" size="sm" asChild>
            <Link href={`/tasks/${task.id}/edit`}>Edit</Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={isBusy}
            onClick={() => onDelete(task)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
