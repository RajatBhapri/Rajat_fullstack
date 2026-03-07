import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { Pool } from "pg";

let container: any;
let pool: any;

beforeAll(async () => {
  container = await new PostgreSqlContainer("postgres:16").start();

  pool = new Pool({
    host: container.getHost(),
    port: container.getPort(),
    user: container.getUsername(),
    password: container.getPassword(),
    database: container.getDatabase(),
  });

  await pool.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
}, 100000);

beforeEach(async () => {
  await pool.query("TRUNCATE users");
});

async function createUser(email: string, password: string) {
  const r = await pool.query(
    "INSERT INTO users(email,password) VALUES ($1,$2) RETURNING id,email",
    [email, password],
  );
  return r.rows[0];
}

async function getUserByEmail(email: string) {
  const r = await pool.query("SELECT id,email FROM users WHERE email=$1", [
    email,
  ]);
  return r.rows[0];
}

describe("User repo", () => {
  it("creates and reads user", async () => {
    await createUser("rajat@test.com", "123");

    const user = await getUserByEmail("rajat@test.com");

    expect(user.email).toBe("rajat@test.com");
  });

  it("duplicate email should fail", async () => {
    await createUser("rajat@test.com", "123");

    await expect(createUser("rajat@test.com", "456")).rejects.toThrow();
  });
});

afterAll(async () => {
  await pool.end();
  await container.stop();
});
