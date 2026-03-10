import { pool } from "./db";

export async function withTransaction<T>(
  fn: (client: Awaited<ReturnType<typeof pool.connect>>) => Promise<T>,
  maxRetries = 3,
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN ISOLATION LEVEL SERIALIZABLE");
      const result = await fn(client);
      await client.query("COMMIT");
      client.release();
      return result;
    } catch (err: any) {
      await client.query("ROLLBACK");
      client.release();
      if (err.code === "40001" && attempt < maxRetries) {
        console.warn(`Serialization failure, retrying attempt ${attempt}...`);
        continue;
      }
      throw err;
    }
  }
  throw new Error("Transaction failed after maximum retries");
}
