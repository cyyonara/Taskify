"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.changeAvatar = exports.changeUsername = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_model_1 = __importDefault(require("../models/user.model"));
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const validation_1 = require("../utils/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
// @PUT - private - /api/user/username
const usernameSchema = zod_1.z.string().min(2).max(30);
exports.changeUsername = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { username } = req.body;
        const validateUsername = usernameSchema.parse(username);
        const user = await user_model_1.default.findOne({ _id: { $ne: req.user?._id }, username });
        if (user) {
            res.status(400);
            throw new Error("Username already in use. Try another one");
        }
        const updatedUser = await user_model_1.default.findByIdAndUpdate(req.user?.id, {
            $set: { username: validateUsername },
        }, { new: true });
        res
            .status(201)
            .json({ username: updatedUser?.username, avatar: updatedUser?.avatar });
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
// @PUT - private - /api/user/avatar
const avatarSchema = zod_1.z.string().url();
exports.changeAvatar = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { avatar } = req.body;
        const validatedAvatarUrl = avatarSchema.parse(avatar);
        const updatedUser = await user_model_1.default.findByIdAndUpdate(req.user?._id, {
            $set: { avatar: validatedAvatarUrl },
        }, { new: true });
        res
            .status(201)
            .json({ username: updatedUser?.username, avatar: updatedUser?.avatar });
    }
    catch (error) {
        let errorMessage;
        if (error instanceof zod_1.ZodError) {
            errorMessage = "Avatar must be a valid url";
            res.status(400);
        }
        else {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
});
exports.changePassword = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { newPassword, currentPassword } = req.body;
        const validatedPassword = validation_1.passwordSchema.parse(newPassword);
        const user = await user_model_1.default.findById(req.user?._id);
        const isValidPassword = bcrypt_1.default.compareSync(currentPassword, user.password);
        if (!isValidPassword) {
            res.status(400);
            throw new Error("Incorrect password");
        }
        const hashedPassword = bcrypt_1.default.hashSync(validatedPassword, 10);
        await user_model_1.default.findByIdAndUpdate(req.user?._id, { password: hashedPassword });
        res.status(201).json({ success: true, message: "Password changed" });
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
