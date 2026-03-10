import pg from "pg";
import { DB_CONFIG, REPLICA_URL } from "./env";
import { EventEmitter } from "events";

const { Pool } = pg;

export const pool = new Pool(DB_CONFIG);

export const replicaPool = REPLICA_URL
  ? new Pool({ connectionString: REPLICA_URL })
  : null;

export const dbMonitor = new EventEmitter();

export async function query(
  sql: string,
  params: any[] = [],
  useReplica = false,
) {
  const start = Date.now();
  const client =
    useReplica && replicaPool
      ? await replicaPool.connect()
      : await pool.connect();
  try {
    const res = await client.query(sql, params);
    const duration = Date.now() - start;

    dbMonitor.emit("query", { sql, duration, useReplica });
    return res;
  } finally {
    client.release();
  }
}
