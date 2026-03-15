"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { getClientAuthToken } from "@/lib/auth";
import type { Task, TaskPriority } from "@/lib/types";

type TaskFormValues = {
  title: string;
  description: string;
  priority: TaskPriority;
  completed: boolean;
};

interface TaskEditorFormProps {
  mode: "create" | "edit";
  task?: Task;
}

export function TaskEditorForm({ mode, task }: TaskEditorFormProps) {
  const router = useRouter();
  const [pageError, setPageError] = useState("");
  const [pageSuccess, setPageSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = useMemo<TaskFormValues>(
    () => ({
      title: task?.title ?? "",
      description: task?.description ?? "",
      priority: task?.priority ?? "medium",
      completed: task?.completed ?? false,
    }),
    [task],
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = async (data: TaskFormValues) => {
    setPageError("");
    setPageSuccess("");

    try {
      setIsSubmitting(true);

      const token = getClientAuthToken();

      if (!token) {
        setPageError("Please login again.");
        router.push("/login");
        return;
      }

      if (!data.title.trim()) {
        setPageError("Task title is required.");
        return;
      }

      if (data.title.trim().length < 3) {
        setPageError("Task title must be at least 3 characters.");
        return;
      }

      if (mode === "create") {
        await api.createTask(
          {
            title: data.title.trim(),
            description: data.description.trim(),
            priority: data.priority,
            completed: false,
            status: "pending",
          },
          { authToken: token },
        );

        setPageSuccess("Task created successfully.");
        reset({
          title: "",
          description: "",
          priority: "medium",
          completed: false,
        });
        router.push("/tasks");
        router.refresh();
        return;
      }

      if (!task) {
        setPageError("Task data is missing.");
        return;
      }

      await api.updateTask(
        task.id,
        {
          title: data.title.trim(),
          description: data.description.trim(),
          priority: data.priority,
          completed: data.completed,
          status: data.completed ? "completed" : "pending",
        },
        { authToken: token },
      );

      setPageSuccess("Task updated successfully.");
      router.push(`/tasks/${task.id}`);
      router.refresh();
    } catch (error) {
      setPageError(
        error instanceof Error ? error.message : "Failed to save task.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {pageError ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {pageError}
        </div>
      ) : null}

      {pageSuccess ? (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {pageSuccess}
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          placeholder="Enter task title..."
          disabled={isSubmitting}
          aria-invalid={!!errors.title}
          className={
            errors.title ? "border-red-500 focus-visible:ring-red-500" : ""
          }
          {...register("title", {
            required: "Task title is required.",
            minLength: {
              value: 3,
              message: "Task title must be at least 3 characters.",
            },
          })}
        />
        {errors.title ? (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        ) : (
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Use a short and clear task title.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Add task details..."
          disabled={isSubmitting}
          className={`min-h-[100px] resize-none ${
            errors.description ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
          aria-invalid={!!errors.description}
          {...register("description", {
            maxLength: {
              value: 300,
              message: "Description must be 300 characters or less.",
            },
          })}
        />
        {errors.description ? (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        ) : (
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Optional. Add more context for this task.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>

        <Controller
          name="priority"
          control={control}
          rules={{ required: "Priority is required." }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="priority"
                className={
                  errors.priority ? "border-red-500 focus:ring-red-500" : ""
                }
                aria-invalid={!!errors.priority}
              >
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {errors.priority ? (
          <p className="text-sm text-red-600">{errors.priority.message}</p>
        ) : (
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Choose the importance level for this task.
          </p>
        )}
      </div>

      {mode === "edit" ? (
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded border-gray-300"
              disabled={isSubmitting}
              {...register("completed")}
            />
            <span className="text-sm">Mark task as completed</span>
          </Label>
        </div>
      ) : null}

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
              ? "Create Task"
              : "Update Task"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="flex-1"
          disabled={isSubmitting}
          onClick={() => {
            if (mode === "create") {
              reset({
                title: "",
                description: "",
                priority: "medium",
                completed: false,
              });
              return;
            }

            reset(defaultValues);
          }}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
