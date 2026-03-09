export type LogLevel = "info" | "warn" | "error";

export class Logger {
  constructor(private level: LogLevel) {}

  info(message: string, context?: object) {
    console.log("INFO", message, context);
  }

  warn(message: string, context?: object) {
    console.warn("WARN", message, context);
  }

  error(error: Error, context?: object) {
    console.error("ERROR", error.message, context);
  }
}
