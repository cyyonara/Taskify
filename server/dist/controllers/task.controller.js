"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.addTask = exports.getImportantTasks = exports.getCompletedTasks = exports.getTasks = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validation_1 = require("../utils/validation");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const task_model_1 = __importDefault(require("../models/task.model"));
// @GET - private - /api/tasks
exports.getTasks = (0, express_async_handler_1.default)(async (req, res) => {
    const tasks = await task_model_1.default.find({ author: req.user?._id }).sort({ date: 1 });
    res.status(200).json(tasks);
});
// @GET - private - /api/tasks/completed
exports.getCompletedTasks = (0, express_async_handler_1.default)(async (req, res) => {
    const completedTasks = await task_model_1.default.find({
        author: req.user?._id,
        isCompleted: true,
    }).sort({ date: 1 });
    res.status(200).json(completedTasks);
});
// @GET - private - /api/tasks/important
exports.getImportantTasks = (0, express_async_handler_1.default)(async (req, res) => {
    const importantTasks = await task_model_1.default.find({
        author: req.user?._id,
        isImportant: true,
    }).sort({ date: 1 });
    res.status(200).json(importantTasks);
});
// @POST - private - /api/taskss
exports.addTask = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { date, ...rest } = req.body;
        const validatedTask = validation_1.taskSchema.parse({
            author: req.user?._id.toString(),
            date: new Date(date),
            ...rest,
        });
        const task = new task_model_1.default(validatedTask);
        const newTask = await task.save();
        res.status(201).json(newTask);
    }
    catch (error) {
        let errorMessage;
        if (error instanceof zod_1.ZodError) {
            res.status(400);
            errorMessage = (0, zod_validation_error_1.fromZodError)(error).toString();
        }
        else {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
});
// @PUT - private - /api/tasks/:id
exports.updateTask = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { id } = req.params;
        const { date, ...rest } = req.body;
        const validatedTask = validation_1.updatedTaskSchema.parse({
            date: new Date(date),
            ...rest,
        });
        const task = await task_model_1.default.findOne({ _id: id, author: req.user?._id });
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
        res.status(201).json(updatedTask);
    }
    catch (error) {
        let errorMessage;
        if (error instanceof zod_1.ZodError) {
            errorMessage = (0, zod_validation_error_1.fromZodError)(error).toString();
            res.status(400);
        }
        else {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
});
// @DELETE - private - /api/tasks/:id
exports.deleteTask = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    await task_model_1.default.findOneAndDelete({ author: req.user?._id, _id: id });
    res.status(200).json({ success: true, message: "Task deleted successfully" });
});
