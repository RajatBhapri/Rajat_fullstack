function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}

try {
  const result = divide(10, 2);
  console.log("Result:", result);
} catch (error) {
  console.error("Caught error:", (error as Error).message);
}

function fetchUser(): Promise<string> {
  return new Promise((resolve, reject) => {
    reject(new Error("Failed to fetch user"));
  });
}

fetchUser()
  .then((data) => {
    console.log("Success:");
  })
  .catch((error) => {
    console.error("Promise caught error:", error.message);
  });

process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught Exception detected:", error.message);
  process.exit(1);
});

function crashApp() {
  throw new Error("Unexpected crash!");
  
}

crashApp();

process.on("unhandledRejection", (reason: unknown) => {
  console.error("Unhandled Rejection detected:", reason);
  process.exit(1);
});

function asyncCrash(): Promise<void> {
  return Promise.reject(new Error("Async failure!"));
}

asyncCrash();
