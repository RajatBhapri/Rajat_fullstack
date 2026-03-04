import Express from "express";

const app = Express();

app.get("/", (req, res) => {
  res.send("Hello Expresss");
});

app.get("/ping", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

process.on("SIGINT", () => {
  console.log("\nSIGINT received. Shutting down gracefully...");
  });