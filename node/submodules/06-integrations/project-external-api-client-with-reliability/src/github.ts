import { request } from "./client.js";

export interface Repo {
  id: number;
  name: string;
  full_name: string;
}

export async function getRepo(owner: string, repo: string): Promise<Repo> {
  return request(`https://api.github.com/repos/${owner}/${repo}`);
}

export async function createResource() {
  return request("https://api.example.com/resource", {
    method: "POST",
    headers: {
      "Idempotency-Key": crypto.randomUUID(),
    },
    data: { name: "test" },
  });
}
