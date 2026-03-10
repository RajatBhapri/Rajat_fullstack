import type { Request, Response } from "express";
import { query } from "./db.js";

export async function healthCheck(req: Request, res: Response) {
  try {
    await query("SELECT 1");

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
}
