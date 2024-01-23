"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signUp = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const validation_1 = require("../utils/validation");
// @POST - public - /api/auth/sign-up
exports.signUp = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { username, password } = validation_1.signUpSchema.parse(req.body);
        const user = new user_model_1.default({ username, password });
        const isUsernameExist = await user_model_1.default.exists({ username: user.username });
        if (isUsernameExist) {
            res.status(400);
            throw new Error("Username already exist");
        }
        const hashedPwd = bcrypt_1.default.hashSync(user.password, 10);
        user.password = hashedPwd;
        const token = user.generateToken();
        const savedUser = await user.save();
        res
            .cookie("taskify_access_token", token, {
            httpOnly: true,
            maxAge: 60 * (1000 * 60 * 60 * 24),
            sameSite: "none",
            secure: true,
        })
            .status(201)
            .json({ username: savedUser.username, avatar: savedUser.avatar });
    }
    catch (error) {
        let errorMessage;
        if (error instanceof zod_1.ZodError) {
            errorMessage = (0, zod_validation_error_1.fromZodError)(error).toString();
        }
        else {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
});
// @POST - public - /api/auth/login
exports.login = (0, express_async_handler_1.default)(async (req, res) => {
    const { username, password } = req.body;
    const user = await user_model_1.default.findOne({ username });
    if (!user) {
        res.status(400);
        throw new Error("Invalid username or password");
    }
    const isPasswordMatch = bcrypt_1.default.compareSync(password, user.password);
    if (!isPasswordMatch) {
        res.status(400);
        throw new Error("Invalid username or password");
    }
    const token = user.generateToken();
    res
        .cookie("taskify_access_token", token, {
        httpOnly: true,
        maxAge: 60 * (1000 * 60 * 60 * 24),
        sameSite: "none",
        secure: true,
    })
        .status(201)
        .json({ username: user.username, avatar: user.avatar });
});
// @DELETE - public - /api/auth/logout
exports.logout = (0, express_async_handler_1.default)(async (req, res) => {
    res.clearCookie("taskify_access_token").status(200).json({ success: true });
});
