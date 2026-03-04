import { watch } from "fs";

const watcher = watch("input.txt");

let timeout: NodeJS.Timeout | null;

watcher.on("change", (eventType, filename) => {
  if (eventType === "change") {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      console.log("File modified (debounced)");
      console.log(`File: ${filename}`);
    }, 300);
  } else if (eventType === "rename") {
    console.log("File renamed or deleted");
  }
  console.log(`File: ${filename}`);
});

setTimeout(() => {
  watcher.close();
  console.log("Stopped watching after 30 seconds");
}, 30000);
