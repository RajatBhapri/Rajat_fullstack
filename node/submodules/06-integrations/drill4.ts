import express from "express";
import { callApi } from "./helper/resilientClient.js";

const app = express();

app.get("/posts", async (req, res) => {
  try {
    const data = await callApi("https://jsonplaceholder.typicode.com/posts");

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
