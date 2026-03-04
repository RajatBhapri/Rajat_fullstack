import express from "express";
import type { Request, Response } from "express";
import path from "path"

const app = express();

// 1
app.get("/ok", (req, res) => {
  res.status(200).send("Everything is fine!");
});

app.post("/created", (req, res) => {
  //didnt get this one, error => 404
  res.status(201).send("Resource created!");
});

app.get("/bad", (req: Request, res: Response) => {
  res.status(400).send("Bad request");
});

app.get("/notfound", (req: Request, res: Response) => {
  res.status(404).send("Page not found");
});

// 2
app.get("/header", (req: Request, res: Response) => {
  res.setHeader("Header", "Rajat");
  res.send("Header set!");
});

// 3
app.get("/normal",(req,res)=>{
  res.send("this is a normal string message")
})

app.get("/json",(req,res)=>{
  res.json({message:"this is json"})
})

// 4
 app.get("/home",(req,res) => {
  // const fpath = path.join()
  res.sendFile("index.html", { root: path.join(process.cwd(), "demoextra") })
 })

 // 5
 app.get("/go-home", (_req, res) => {
  res.redirect("/")
});

const server = app.listen(3000);
