import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json());

// app.use((req, _res, next) => {
//   console.log("Global middleware");
//   next();
// });

app.use("/api", userRouter);

app.listen(3000);
