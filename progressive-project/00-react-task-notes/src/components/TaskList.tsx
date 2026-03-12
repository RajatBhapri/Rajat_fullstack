import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import DeleteModal from "./DeleteModal";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import TaskItem from "./TaskItem";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types/task";

export default function TaskList() {
  const {
    filteredTasks,
    loading,
    submitting,
    error,
    filter,
    search,
    setFilter,
    setSearch,
    addTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  async function handleConfirmDelete() {
    if (!taskToDelete) return;

    await deleteTask(taskToDelete.id);
    setTaskToDelete(null);
  }

  return (
    <div className="page-container">
      <h1>Task Notes React App</h1>
      <p className="subtitle">Connects to your Task Notes API</p>

      <AddTaskForm onAddTask={addTask} submitting={submitting} />

      <div className="card filters-card">
        <h2>Search & Filter</h2>

        <div className="filters-row">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "completed" | "pending")
            }
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <LoadingSpinner />
      ) : filteredTasks.length === 0 ? (
        <div className="card empty-state">No tasks found.</div>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={updateTask}
              onDeleteClick={setTaskToDelete}
            />
          ))}
        </div>
      )}

      <DeleteModal
        open={!!taskToDelete}
        taskTitle={taskToDelete?.title || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
}
