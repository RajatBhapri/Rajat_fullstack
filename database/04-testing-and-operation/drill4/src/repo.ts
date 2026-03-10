import { pool } from "./db.js";

export async function timedQuery(query: string, params: any[] = []) {
  const start = Date.now();

  const result = await pool.query(query, params);

  const duration = Date.now() - start;

  console.log(`Query time: ${duration}ms`);

  if (duration > 100) {
    console.log("⚠️ Slow query detected");
    console.log(query);
  }

  return result;
}

export async function createUser(email: string) {
  return timedQuery("INSERT INTO users(email) VALUES($1)", [email]);
}

export async function getUsers() {
  return timedQuery("SELECT * FROM users");
}
