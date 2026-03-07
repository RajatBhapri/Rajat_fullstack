import * as express from "express";
import type { Request, Response } from "express";
import { fetchExternal } from "./api";
import { createPayment } from "./payment";

const app = express();
app.use(express.json());

app.get("/external", async (req: Request, res: Response) => {
  try {
    const data = await fetchExternal();
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/pay", async (req, res) => {
  const result = await createPayment();
  res.json(result);
});

app.listen(3000, () => {
  console.log("server running");
});
