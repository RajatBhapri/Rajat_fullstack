export interface AppConfig {
  port: number;
  logLevel: string;
  env: "development" | "production" | "test";
}

export function loadConfig(): AppConfig {
  return {
    port: parseInt(process.env.PORT || "3000"),
    logLevel: process.env.LOG_LEVEL || "info",
    env: (process.env.NODE_ENV as any) || "development",
  };
}
