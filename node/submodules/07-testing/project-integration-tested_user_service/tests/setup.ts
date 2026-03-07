import { PostgreSqlContainer } from "testcontainers";
import { beforeAll, afterAll } from "vitest";
import { Pool } from "pg";

let container: any;

beforeAll(async () => {
  container = await new PostgreSqlContainer().start();

  process.env.DATABASE_URL = container.getConnectionUri();

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  await pool.query("create table users(id serial primary key, name text)");

  await pool.query("insert into users(name) values('seed')");
});

afterAll(async () => {
  await container.stop();
});
