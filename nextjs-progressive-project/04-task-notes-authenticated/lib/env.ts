import { config } from "@/lib/config";

export const env = {
  API_URL: config.apiUrl,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  JWT_SECRET: config.jwtSecret,
  AUTH_COOKIE_NAME: "auth-token",
  USER_COOKIE_NAME: "user",
  AUTH_TOKEN_STORAGE_KEY: "task_notes_token",
  AUTH_EMAIL_STORAGE_KEY: "task_notes_user_email",
};