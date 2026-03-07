import { fetchJson } from "./helper/fetchJson";

async function run() {
  const data = await fetchJson("https://jsonplaceholder.typicode.com/posts/1");

  console.log(data);
}

run();
