import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1),
});

export type TaskInput = z.infer<typeof TaskSchema>;
