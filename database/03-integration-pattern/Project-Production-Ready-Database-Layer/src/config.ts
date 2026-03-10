import dotenv from "dotenv"

dotenv.config()

export const config = {
  env: process.env.NODE_ENV || "development",

  db: {
    url:
      process.env.NODE_ENV === "test"
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL,

    poolMax: Number(process.env.POOL_MAX) || 10,
    idleTimeout: Number(process.env.POOL_IDLE_TIMEOUT) || 30000,

    ssl: process.env.NODE_ENV === "production"
  }
}