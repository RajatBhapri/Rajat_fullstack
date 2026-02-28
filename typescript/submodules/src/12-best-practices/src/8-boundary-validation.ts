import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1)
});

type User = z.infer<typeof UserSchema>;

function validate(input: unknown):
  | { ok: true; data: User }
  | { ok: false; code: string } {

  const result = UserSchema.safeParse(input);

  if (!result.success) {
    return { ok: false, code: "INVALID_USER" };
  }

  return { ok: true, data: result.data };
}

const good = validate({
  id: crypto.randomUUID(),
  name: "Alice"
});

const bad = validate({
  id: "not-uuid",
  name: ""
});

console.log(good);
console.log(bad);