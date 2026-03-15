"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createTaskAction, type CreateTaskState } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState: CreateTaskState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-[hsl(var(--primary-foreground))] disabled:opacity-60"
    >
      {pending ? "Creating..." : "Create Task"}
    </button>
  );
}

export default function NewTaskForm() {
  const [state, formAction] = useActionState(createTaskAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state.error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter task title..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Add task details..."
          className="min-h-[100px] resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <select
          id="priority"
          name="priority"
          defaultValue="medium"
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <SubmitButton />

        <button
          type="reset"
          className="flex-1 rounded-md border px-4 py-2"
        >
          Reset
        </button>
      </div>
    </form>
  );
}