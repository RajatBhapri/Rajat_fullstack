export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function mapPgError(err: any): AppError {
  switch (err.code) {
    case "23505":
      return new AppError("DUPLICATE", "Record already exists.");
    case "23503":
      return new AppError("FK_VIOLATION", "Invalid foreign key reference.");
    case "57P01":
      return new AppError("DB_UNAVAILABLE", "Database is unavailable.");
    default:
      return new AppError("UNKNOWN", err.message);
  }
}
