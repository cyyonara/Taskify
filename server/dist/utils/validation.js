"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedTaskSchema = exports.passwordSchema = exports.taskSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
// validation schema for adding a new user
exports.signUpSchema = zod_1.z
    .object({
    username: zod_1.z.string().min(2).max(30).trim(),
    password: zod_1.z.string().min(8).max(30).trim(),
})
    .strict();
// validation schema for adding a new task
exports.taskSchema = zod_1.z
    .object({
    author: zod_1.z.string(),
    taskName: zod_1.z.string().trim(),
    description: zod_1.z.string().trim(),
    date: zod_1.z.date(),
    isCompleted: zod_1.z.boolean(),
    isImportant: zod_1.z.boolean(),
})
    .strict();
exports.passwordSchema = zod_1.z.string().min(8).max(30).trim();
exports.updatedTaskSchema = exports.taskSchema.omit({ author: true });
