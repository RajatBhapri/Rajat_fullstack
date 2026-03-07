import express from "express";
const app = express();
app.use(express.json());
let jobId = 1;
const queue = [];
app.post("/email", (req, res) => {
    const { to, subject, body } = req.body;
    const job = {
        id: jobId++,
        to,
        subject,
        body,
    };
    queue.push(job);
    res.json({
        message: "Email job queued",
        jobId: job.id,
    });
});
setInterval(async () => {
    const job = queue.shift();
    if (!job)
        return;
    console.log(`Starting job ${job.id} -> sending email to ${job.to}`);
    await new Promise((r) => setTimeout(r, 500));
    console.log(`Completed job ${job.id}`);
}, 1000);
const server = app.listen(3000, () => {
    console.log("Server running on port 3000");
});
process.on("SIGINT", () => {
    console.log("Shutting down server...");
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
});
//# sourceMappingURL=drill1.js.map