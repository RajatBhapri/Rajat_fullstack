import { query } from "./db.js";

export async function dbHealth() {
  try {
    await query("SELECT 1");
    return { status: "ok" };
  } catch {
    return { status: "down" };
  }
}
