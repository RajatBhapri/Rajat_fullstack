import { writeFile } from "fs/promises";
import { createReadStream } from "fs";

async function createLargeFile() {
  const data = "A".repeat(1024 * 1024); // 1 MB
  await writeFile("large.txt", data);
  console.log("1 MB file created.");
}

// 2

createLargeFile();

const stream = createReadStream("large.txt");

// 3

let chunkCount = 0;

stream.on("data", (chunk: Buffer) => {
  chunkCount++;
  console.log(`Chunk ${chunkCount}`);
  console.log("Chunk size:", chunk.length);
});

// 4

stream.on("error", (err) => {
  console.error("Error:", err.message);
});

// 5

stream.on("end", () => {
  console.log("done.");
  console.log("Total chunks:", chunkCount);
});
