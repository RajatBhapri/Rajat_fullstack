"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { getClientAuthToken } from "@/lib/auth";
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

type TaskFormValues = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
};

export default function TaskForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      setIsSubmitting(true);

      const token = getClientAuthToken();

      if (!token) {
        toast.error("Please login to create a task.");
        router.push("/login?next=/tasks/new");
        return;
      }

      await api.createTask(
        {
          title: data.title.trim(),
          description: data.description.trim(),
          priority: data.priority,
          completed: false,
          status: "pending",
        },
        {
          authToken: token,
        },
      );

      toast.success("Task created successfully.");

      reset({
        title: "",
        description: "",
        priority: "medium",
      });

      router.push("/tasks");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create task.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Task"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="flex-1"
          disabled={isSubmitting}
          onClick={() =>
            reset({
              title: "",
              description: "",
              priority: "medium",
            })
          }
        >
          Reset
        </Button>
      </div>
    </form>
  );
}