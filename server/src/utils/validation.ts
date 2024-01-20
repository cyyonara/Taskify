import { z } from "zod";

// validation schema for adding a new user
export const signUpSchema = z
  .object({
    username: z.string().min(2).max(30).trim(),
    password: z.string().min(8).max(30).trim(),
  })
  .strict();

// validation schema for adding a new task
export const taskSchema = z
  .object({
    author: z.string(),
    taskName: z.string().trim(),
    description: z.string().trim(),
    date: z.date(),
    isCompleted: z.boolean(),
    isImportant: z.boolean(),
  })
  .strict();

export const updatedTaskSchema = taskSchema.omit({ author: true });
