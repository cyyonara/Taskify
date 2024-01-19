import handler from "express-async-handler";
import { IRequest } from "../types/t.customRequest";
import { Response } from "express";
import { taskSchema } from "../utils/validation";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";
import { Task as ITask } from "../types/t.task";
import Task from "../models/task.model";

// @POST - private - /api/taskss
export const addTask = handler(async (req: IRequest, res: Response): Promise<void> => {
  try {
    const { date, ...rest }: ITask = req.body;
    const validatedTask = taskSchema.parse({
      author: req.user?._id.toString(),
      date: new Date(date),
      ...rest,
    });

    const task = new Task(validatedTask);
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error: any) {
    if (error instanceof ZodError) {
      const errorMessage = fromZodError(error).toString();
      res.status(400).json({ messsage: errorMessage });
    } else {
      res.status(500);
      throw new Error(error.message);
    }
  }
});

// @GET - private - /api/tasks
export const getTasks = handler(async (req: IRequest, res: Response): Promise<void> => {
  const tasks = await Task.find({ author: req.user?._id }).sort({ date: -1 });
  res.status(200).json(tasks);
});
