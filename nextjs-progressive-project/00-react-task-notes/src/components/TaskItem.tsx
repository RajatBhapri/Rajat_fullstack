import { useState } from "react";
import type { Task, UpdateTaskInput } from "../types/task";

interface TaskItemProps {
  task: Task;
  onUpdateTask: (id: string, updates: UpdateTaskInput) => Promise<void>;
  onDeleteClick: (task: Task) => void;
}

export default function TaskItem({
  task,
  onUpdateTask,
  onDeleteClick,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState<Task["priority"]>(task.priority);

  async function handleToggleCompleted() {
    await onUpdateTask(task.id, { completed: !task.completed });
  }

  async function handleSave() {
    if (!title.trim()) return;

    await onUpdateTask(task.id, {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
    });

    setIsEditing(false);
  }

  function handleCancel() {
    setTitle(task.title);
    setDescription(task.description || "");
    setPriority(task.priority);
    setIsEditing(false);
  }

  return (
    <div className="card task-item">
      <div className="task-header">
        <div className="task-checkbox-row">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleCompleted}
          />
          {!isEditing ? (
            <h3 className={task.completed ? "completed-title" : ""}>
              {task.title}
            </h3>
          ) : (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
        </div>

        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>

      {!isEditing ? (
        <p className="task-description">
          {task.description || "No description"}
        </p>
      ) : (
        <>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task["priority"])}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </>
      )}

      <div className="task-meta">
        <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
        <small>Updated: {new Date(task.updatedAt).toLocaleString()}</small>
      </div>

      <div className="task-actions">
        {!isEditing ? (
          <button className="secondary-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        ) : (
          <>
            <button className="primary-btn" onClick={handleSave}>
              Save
            </button>
            <button className="secondary-btn" onClick={handleCancel}>
              Cancel
            </button>
          </>
        )}

        <button className="danger-btn" onClick={() => onDeleteClick(task)}>
          Delete
        </button>
      </div>
    </div>
  );
}
