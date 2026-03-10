import pg from "pg";
import { mapPgError, AppError } from "./errors";
import { generateCorrelationId } from "./correlation";
import { CircuitBreaker } from "./circuitBreaker";

import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const circuit = new CircuitBreaker();

export async function query(sql: string, params: any[] = []) {
  const correlationId = generateCorrelationId();
  const start = Date.now();

  try {
    return await circuit.exec(async () => {
      const res = await pool.query(sql, params);
      const duration = Date.now() - start;

      // Log slow queries (>100ms)
      if (duration > 100) {
        console.warn(
          `[SLOW QUERY] ${duration}ms | ID=${correlationId} | SQL=${sql} | Params=${JSON.stringify(params)}`,
        );
      }

      return res;
    });
  } catch (err: any) {
    const mapped = mapPgError(err);
    console.error(
      `[ERROR] ID=${correlationId} | ${mapped.code} | ${mapped.message}`,
    );
    throw mapped;
  }
}
