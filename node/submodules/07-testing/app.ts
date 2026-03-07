import express from "express";

export const app = express();

app.get("/weather", async (req, res) => {
  try {
    const response = await fetch("https://api.weather.com/data");

    if (!response.ok) {
      return res.status(502).json({ error: "Bad upstream response" });
    }

    const data = await response.json();

    res.json({
      city: data.city,
      temperature: data.temp,
    });
  } catch (err) {
    res.status(502).json({ error: "External API failed" });
  }
});
