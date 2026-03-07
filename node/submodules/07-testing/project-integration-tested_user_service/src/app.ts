import express from "express";
import { pool } from "./db";
import { fetchExternal } from "./external";

export const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  const r = await pool.query("select * from users");
  res.json(r.rows);
});

app.post("/users", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });

  const r = await pool.query("insert into users(name) values($1) returning *", [
    name,
  ]);

  res.status(201).json(r.rows[0]);
});

app.get("/external", async (req, res) => {
  const data = await fetchExternal();
  res.json(data);
});
