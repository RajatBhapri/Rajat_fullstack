type PromiseType<T> = T extends Promise<infer U> ? U : T;

type A = PromiseType<Promise<string>>;  // string
type B = PromiseType<Promise<number>>;  // number
type C = PromiseType<boolean>;          // boolean

type Nullable<T> = T | null;
type D = Nullable<string>;  // string | null

type NonNullable<T> = T extends null | undefined ? never : T;
type E = NonNullable<string | null | undefined>;  // string

// NonNullable<string>      → string
// NonNullable<null>        → never
// NonNullable<undefined>   → never