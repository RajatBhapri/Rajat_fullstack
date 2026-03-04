import express from "express";
import type {
  Request,
  Response,
  NextFunction,
} from "express";

const app = express();

app.use(express.json({ limit: "1mb" }));

const jsonErrorHandler= (err:Error , _req:Request, res:Response, next:NextFunction) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Malformed JSON" });
  }
  next(err);
};

app.use(jsonErrorHandler);

app.post("/echo", (req, res) => {
  res.json(req.body);
});

app.use(express.urlencoded({ extended: true }));

app.post("/form", (req, res) => {
  res.json(req.body);
});

const server = app.listen(3000);
