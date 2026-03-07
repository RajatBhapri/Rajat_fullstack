export class ApiError extends Error {
  status?: number | undefined;
  requestId?: string | undefined;

  constructor(message: string, status?: number, requestId?: string) {
    super(message);
    this.status = status;
    this.requestId = requestId;
  }
}
