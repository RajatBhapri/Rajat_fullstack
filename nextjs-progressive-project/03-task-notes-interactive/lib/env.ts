const fallbackApiUrl = "http://localhost:3000";

export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || fallbackApiUrl,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  AUTH_COOKIE_NAME: "task_notes_token",
  AUTH_EMAIL_STORAGE_KEY: "task_notes_user_email",
  AUTH_TOKEN_STORAGE_KEY: "task_notes_token",
};

if (!process.env.NEXT_PUBLIC_API_URL && process.env.NODE_ENV !== "production") {
  console.warn(
    `NEXT_PUBLIC_API_URL is not set. Falling back to ${fallbackApiUrl}.`,
  );
}
