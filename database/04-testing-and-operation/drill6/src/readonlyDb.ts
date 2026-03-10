import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const readonlyPool = new Pool({
  connectionString: process.env.READONLY_DATABASE_URL,
});
