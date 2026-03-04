import Express from "express";
import type { Request, Response, NextFunction } from "express";
const app = Express();

const demo = (req: Request, res: Response, next: NextFunction) => {
  const uid = req.params.id;
  console.log("demo1");
  res.json({ msg: "demo rajat" });
  next();
};

const demo2 = (req: Request, res: Response, next: NextFunction) => {
  const uid = req.params.id;
  console.log("demo2");
  res.json({ msg: "demo2 rajat" });

  next();
};

app.use("/user/:id", demo, demo2);

app.get("/search", (req, res) => {
  const name = req.query.name;
  res.json({ name });
});

app.get("/users/:id/posts", (req, res) => {
  const uid = req.params.id;
  const limit = req.query.limit;
  res.json({ uid, limit });
});

app.use((req, res) => {
  res.status(404).json({ error: "page not found" });
});

const server = app.listen(3000);
