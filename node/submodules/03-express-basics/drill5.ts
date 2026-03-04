import express from "express";
import { randomUUID } from "crypto";

const app = express();

// 5 

app.use((req, res, next) => {
  console.log("1st middleware");
  next();
});

app.use((req, res, next) => {
  console.log("2nd middleware");
  next();
});

app.use((req, res, next) => {
  console.log("3rd middleware");
  next();
});

app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  next();
});

// 2

const start = Date.now();
app.use((req, res, next) => {
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(duration);
  });
  next();
});

// 3

app.use((req,res,next)=>{
  (req as any).requestId = randomUUID();
  console.log(`attatched ${(req as any).requestId}`);
})

app.get("/", (_req, res) => {
  res.status(200).send("Everything is fine!");
});

// 4

app.use("/home",(req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  next();
});



const server = app.listen(3000);
