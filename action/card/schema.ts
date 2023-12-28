import { z } from "zod";

export const createCardSchema = z.object({
  title: z.string().min(3, {
    message: "Title is too short",
  })
});
