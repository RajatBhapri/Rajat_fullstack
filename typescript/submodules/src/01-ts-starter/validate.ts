import { z } from "zod";

const User = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
});
