import dotenv from "dotenv";
dotenv.config();

export type Env = "development" | "test" | "production";

export const ENV: Env = (process.env.NODE_ENV as Env) || "development";

export const DB_CONFIG = {
  development: {
    connectionString: process.env.DEV_DATABASE_URL!,
    max: Number(process.env.DEV_POOL_MAX) || 5,
    ssl: false,
  },
  test: {
    connectionString: process.env.TEST_DATABASE_URL!,
    max: Number(process.env.TEST_POOL_MAX) || 3,
    ssl: false,
  },
  production: {
    connectionString: process.env.PROD_DATABASE_URL!,
    max: Number(process.env.PROD_POOL_MAX) || 20,
    ssl: process.env.PROD_DB_SSL === "true",
  },
}[ENV];

export const REPLICA_URL = process.env.REPLICA_DATABASE_URL || null;
