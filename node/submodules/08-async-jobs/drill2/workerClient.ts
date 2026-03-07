import { Worker } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function runWorker(n: number): Promise<number> {
  return new Promise((resolve, reject) => {
    // const worker = new Worker(path.join(__dirname, "worker.js"));
    const worker = new Worker(new URL("./worker.js", import.meta.url));
    worker.postMessage(n);

    worker.on("message", (msg) => {
      if (msg.error) {
        reject(new Error(msg.error));
      } else {
        resolve(msg.result);
      }
    });

    worker.on("error", reject);

    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with ${code}`));
      }
    });
  });
}
