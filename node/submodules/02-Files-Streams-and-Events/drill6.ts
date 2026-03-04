import { createReadStream, createWriteStream } from "fs";
import { Transform } from "stream";
import { readFile } from "fs/promises";

const readStream = createReadStream("input.txt");
const writeStream = createWriteStream("output.txt");

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("File copied successfully");
});

writeStream.on("error", (err: Error) => {
  console.error("Error:", err.message);
});

// 2

const upperCaseTransform = new Transform({
  transform(chunk: Buffer) {
    
    const text = chunk.toString();

    const uppercased = text.toUpperCase();

    this.push(uppercased);
  }
});

// 3 and 4
console.time("copyTime");

readStream
  .pipe(upperCaseTransform)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("Uppercase file created successfully");
    console.timeEnd("copyTime");
  });

  // 5

  

console.log("Before:", process.memoryUsage().heapUsed);

const data = await readFile("output.txt");

console.log("After:", process.memoryUsage().heapUsed);
