const fallbackApiUrl = "http://localhost:3000";

export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || fallbackApiUrl,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  AUTH_COOKIE_NAME: "auth-token",
  USER_COOKIE_NAME: "user",
};

if (!process.env.NEXT_PUBLIC_API_URL && process.env.NODE_ENV !== "production") {
  console.warn(
    `NEXT_PUBLIC_API_URL is not set. Falling back to ${fallbackApiUrl}.`,
  );
}