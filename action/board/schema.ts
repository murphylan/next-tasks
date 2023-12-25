import { z } from "zod";

export const createBoardSchema = z.object({
  title: z.string().min(3, {
    message: "Title 字符长度太短了。"
  }).max(50),
});
