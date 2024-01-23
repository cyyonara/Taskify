"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyUser_1 = require("../middlewares/verifyUser");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
// @PUT - private - /api/user/username
router.put("/username", verifyUser_1.verifyUser, user_controller_1.changeUsername);
// @PUT - private - /api/user/avatar
router.put("/avatar", verifyUser_1.verifyUser, user_controller_1.changeAvatar);
// @PUT - private - /api/user/password
router.put("/password", verifyUser_1.verifyUser, user_controller_1.changePassword);
exports.default = router;
