import { z } from "zod";

export const taskSchema = z.object({
  taskName: z.string().refine((taskName) => taskName.trim().length > 0, {
    message: "Please enter a task name first",
  }),
  description: z.string().refine((description) => description.length > 0, {
    message: "Please enter a description for your task",
  }),
  date: z.date(),
  isCompleted: z.boolean(),
  isImportant: z.boolean(),
});

export type ITask = z.infer<typeof taskSchema>;

export interface NewTask extends ITask {
  _id: string;
  author: string;
}
