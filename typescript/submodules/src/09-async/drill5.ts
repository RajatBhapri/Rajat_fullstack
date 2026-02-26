function sleep(ms: number){
  return new Promise((resolve, reject) =>{
    setTimeout(()=>{
      resolve
    },ms)
  })
}

async function retry<T>(
  op: () => Promise<T>,
  attempts = 2,
  backoffMs = 300,
): Promise<T> {
  for (let i = 0; i <= attempts; i++) {
    try {
      return await op();
    } catch (err: any) {
      if (err.message === "Aborted") {
        throw err;
      }

      if (!err.retryable || i === attempts) {
        throw err;
      }

      await sleep(backoffMs); 
    }
  }

  throw new Error("Unexpected error");
}