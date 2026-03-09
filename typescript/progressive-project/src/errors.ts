export type TaskErrorCode = "NOT_FOUND" | "INVALID_INPUT";

export class TaskError extends Error {
  constructor(
    message: string,
    public code: TaskErrorCode,
    public context?: object,
  ) {
    super(message);
  }
}
