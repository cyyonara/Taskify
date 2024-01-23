"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
// @POST - public - /api/auth/login
router.post("/login", auth_controller_1.login);
// @POST - public - /api/auth/sign-up
router.post("/sign-up", auth_controller_1.signUp);
// @DELETE - public - /api/auth/logout
router.delete("/logout", auth_controller_1.logout);
exports.default = router;
