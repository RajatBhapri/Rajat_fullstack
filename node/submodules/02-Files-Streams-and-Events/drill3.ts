// 1
const message = "Hello, Node.js";

const buffer = Buffer.from(message);

console.log("Buffer:", buffer);

// 2
const restored = buffer.toString();

console.log("Converted back:", restored);

// 3
const utf8Buffer = Buffer.from(message, "utf8");

const base64Buffer = Buffer.from(message, "base64");

console.log(utf8Buffer);
console.log(base64Buffer);

console.log(utf8Buffer.toString("utf8"));
console.log(base64Buffer.toString("base64"));

// 4
const fixedBuffer = Buffer.alloc(10, 0xff);

console.log("Allocated Buffer:", fixedBuffer);
console.log("Length:", fixedBuffer.length);


// 5
console.log("String length (characters):", message.length);

const sampleBuffer = Buffer.from(message);

console.log("Buffer length (bytes):", sampleBuffer.length);