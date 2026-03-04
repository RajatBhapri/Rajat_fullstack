import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(
  "/api",
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.options("*", cors());

app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.listen(3000);
