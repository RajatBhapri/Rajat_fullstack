import { fetchWithRetry } from "./helper/retryFetch";

async function run() {
  const data = await fetchWithRetry(
    "https://jsonplaceholder.typicode.com/posts/1",
  );

  console.log(data);
}

run();
