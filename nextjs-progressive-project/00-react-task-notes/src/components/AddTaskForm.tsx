import { useState } from "react";
import type { CreateTaskInput } from "../types/task";

interface AddTaskFormProps {
  onAddTask: (input: CreateTaskInput) => Promise<void>;
  submitting: boolean;
}

export default function AddTaskForm({
  onAddTask,
  submitting,
}: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<CreateTaskInput["priority"]>("low");
  const [formError, setFormError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      setFormError("Title is required");
      return;
    }

    setFormError("");

    try {
      console.log("sending form data", {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
      });
      await onAddTask({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
      });

      setTitle("");
      setDescription("");
      setPriority("low");
    } catch {
      // parent hook already handles API error
    }
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>Add Task</h2>

      {formError ? <p className="field-error">{formError}</p> : null}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as CreateTaskInput["priority"])
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button className="primary-btn" type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
