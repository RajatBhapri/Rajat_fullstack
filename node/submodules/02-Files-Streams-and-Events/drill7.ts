// 1
import { EventEmitter } from "events";

const emitter = new EventEmitter();

// 2

emitter.on("greet", (name: string) => {
  console.log(`Hello, ${name.toUpperCase()}`);
});

// 3

emitter.emit("greet", "rajat");

// 4
const listener1 = (name: string) => {
  console.log("Listener 1:", name);
};

const listener2 = (name: string) => {
  console.log("Listener 2:", name);
};

emitter.on("welcome", listener1);
emitter.on("welcome", listener2);

emitter.emit("welcome", "Rajat");     // when we call an .emit it calls every emitter has greet and executes it.

// 5

emitter.off("welcome", listener1);

emitter.emit("welcome", "Rajat");