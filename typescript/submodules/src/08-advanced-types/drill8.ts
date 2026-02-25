type User = { id: string; profile: { name: string; address: { city: string } } }

type City = User["profile"]["address"]["city"];

type RecursiveObject<T> = {
  [K in keyof T]: T[K] extends object ? RecursiveObject<T[K]> : T[K];
};

type RecursiveUser = RecursiveObject<User>;

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [k: string]: JsonValue };