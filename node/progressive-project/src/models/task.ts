export interface Task {
  id: string;
  title: string;
  description?: string | undefined;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}
