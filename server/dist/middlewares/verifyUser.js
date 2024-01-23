"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const verifyUser = async (req, res, next) => {
    if (req.cookies.taskify_access_token) {
        try {
            const token = req.cookies.taskify_access_token;
            const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = await user_model_1.default.findById(id).select("-password");
            if (!user) {
                throw new Error("Unauthorized");
            }
            req.user = user;
            next();
        }
        catch (error) {
            let errorMessage;
            let statusCode = 401;
            if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                errorMessage = "Invalid Token";
            }
            else if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                errorMessage = "Your token is expired. Please try to login again";
            }
            else {
                errorMessage = error.message;
                statusCode = 500;
            }
            res
                .status(statusCode)
                .clearCookie("taskify_access_token")
                .json({ message: errorMessage });
        }
    }
    else {
        res.status(401).json({ message: "Token is missing" });
    }
};
exports.verifyUser = verifyUser;
