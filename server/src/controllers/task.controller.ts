import handler from "express-async-handler";
import { IRequest } from "../types/t.customRequest";
import { Response } from "express";
import { taskSchema, updatedTaskSchema } from "../utils/validation";
import { fromZodError } from "zod-validation-error";
import { ZodError, z } from "zod";
import { Task as ITask } from "../types/t.task";
import Task from "../models/task.model";

// @GET - private - /api/tasks
export const getTasks = handler(async (req: IRequest, res: Response): Promise<void> => {
  const tasks = await Task.find({ author: req.user?._id }).sort({ date: 1 });
  res.status(200).json(tasks);
});

// @GET - private - /api/tasks/completed
export const getCompletedTasks = handler(
  async (req: IRequest, res: Response): Promise<void> => {
    const completedTasks = await Task.find({
      author: req.user?._id,
      isCompleted: true,
    }).sort({ date: 1 });
    res.status(200).json(completedTasks);
  }
);

// @GET - private - /api/tasks/important
export const getImportantTasks = handler(async (req: IRequest, res: Response) => {
  const importantTasks = await Task.find({
    author: req.user?._id,
    isImportant: true,
  }).sort({ date: 1 });
  res.status(200).json(importantTasks);
});

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
      res.status(400);
      throw new Error(errorMessage);
    } else {
      res.status(500);
      throw new Error(error.message);
    }
  }
});

// @PUT - private - /api/tasks/:id
export const updateTask = handler(async (req: IRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { date, ...rest }: ITask = req.body;
    const validatedTask = updatedTaskSchema.parse({
      date: new Date(date),
      ...rest,
    });

    const task = await Task.findOne({ _id: id, author: req.user?._id });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    task.taskName = validatedTask.taskName;
    task.description = validatedTask.description;
    task.date = validatedTask.date;
    task.isCompleted = validatedTask.isCompleted;
    task.isImportant = validatedTask.isImportant;

    const updatedTask = await task.save();
    res.status(201).json(updateTask);
  } catch (error: any) {
    if (error instanceof ZodError) {
      const errorMessage = fromZodError(error).toString();
      res.status(400);
      throw new Error(errorMessage);
    } else {
      res.status(res.statusCode === 200 ? 500 : res.statusCode);
      throw new Error(error.message);
    }
  }
});

// @DELETE - private - /api/tasks/:id
export const deleteTask = handler(async (req: IRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  await Task.findOneAndDelete({ author: req.user?._id, _id: id });
  res.status(200).json({ success: true, message: "Task deleted successfully" });
});
