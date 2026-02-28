import { z } from "zod";

type User = {
  id: string;
  name: string;
};

type ApiResponse<T> = {
  status: number;
  data: T;
};

async function getUser(id: string): Promise<User> {
  return {
    id,
    name: "Alice",
  };
}

async function getUserFromApi(id: string): Promise<ApiResponse<User>> {
  const user = await getUser(id);

  return {
    status: 200,
    data: user,
  };
}

async function typedFetch<T>(url: string, schema: z.ZodSchema<T>): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("request failed");
  }

  const json = await res.json();
  return schema.parse(json);
}

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});

async function main() {
  const localUser = await getUserFromApi("123");
  console.log(localUser.status, localUser.data.name);

  const remoteUser = await typedFetch(
    "https://jsonplaceholder.typicode.com/users/1",
    UserSchema,
  );

  console.log(remoteUser.id, remoteUser.name);
}

main();
