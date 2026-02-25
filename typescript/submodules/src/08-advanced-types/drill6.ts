type user = {
  id: number;
  name?: string;
  age?: number;
};

type req = Required<user>; // name and age are not compulsory now
type reado = Readonly<user>;
type Exclude<T, U> = T extends U ? never : T;

type Result = Exclude<"a" | "b" | "c", "a">; //"b","c"

type Extract<T, U> = T extends U ? T : never;

type Letters = "a" | "b" | "c";
type OnlyA = Extract<Letters, "a">; //"a"
