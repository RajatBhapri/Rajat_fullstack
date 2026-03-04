import express from "express";
import type {
  Request,
  Response,
  NextFunction,
} from "express";

const app = express();

// 1

app.get("/error", (req, res) => {
  throw new Error("Something went wrong!");
});

// 2 and 4
app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    res.status(500).json({
      error:{message: err.message},
    });
      next()
  },

);

// 3
app.get("/async-error", async (req, res) => {
  throw new Error("Async failed");
});

// 5

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const isDev = process.env.NODE_ENV === "development";

  res.status(500).json({
    success: false,
    message: err.message,
    ...(isDev && { stack: err.stack }) // show stack only in dev
  });
});

const server = app.listen(3000);
