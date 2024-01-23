"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/school-9c7f7.appspot.com/o/taskify%2Fd2caafb1-70da-47e2-ba48-efd66565cde1_w1024_r0.9975262832405689_fpx44.98_fpy48.86.jpg?alt=media&token=18eb0774-b91a-416d-be8d-d6a49753cd0e",
    },
    password: {
        type: String,
        required: true,
    },
});
userSchema.methods.generateToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "60d",
    });
};
exports.default = mongoose_1.default.model("User", userSchema);
