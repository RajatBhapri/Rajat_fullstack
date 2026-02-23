// src/operations.ts
// import { Task, Priority } from "./types.ts";

export function createTask(title: string, priority: Priority = "medium"): Task;
export function markCompleted(task: Task): Task;
export function filterByStatus(tasks: Task[], status: boolean): Task[];
export function sortByPriority(tasks: Task[]): Task[];
