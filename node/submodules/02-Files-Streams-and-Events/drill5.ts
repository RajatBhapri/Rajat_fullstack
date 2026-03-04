import { createWriteStream } from "fs";
import { Writable } from "stream";

const logStream: Writable = createWriteStream("app.log", {
  flags: "a",
});

for (let i = 1; i <= 10; i++) {
  logStream.write(`Log line ${i}\n`);
}

logStream.end();

logStream.on("finish", () => {
  console.log("All log data written successfully.");
});

logStream.on("error", (err: Error) => {
  console.error("Stream error:", err.message);
});

const stream = createWriteStream("big.log");

let i = 0;

function writeData() {
  let canWrite = true;

  while (i < 10000 && canWrite) {
    i++;
    canWrite = stream.write(`Line ${i}\n`);
  }

  if ((i < 10000)) {
    stream.once("drain", writeData);
  } else {
    stream.end();
  }
}

writeData();

stream.on("finish", () => {
  console.log("Finished writing big file");
});


const stream2 = createWriteStream("binary.bin");

const buffer = Buffer.from([0x52, 0x61, 0x6a, 0x61, 0x74]);

stream2.write(buffer);
stream2.end();

stream2.on("finish", () => {
  console.log("Binary file created");
});