"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const verifyUser_1 = require("../middlewares/verifyUser");
const router = express_1.default.Router();
// @GET - private - /api/tasks
router.get("/", verifyUser_1.verifyUser, task_controller_1.getTasks);
// @GET - private - /api/tasks/completed
router.get("/completed", verifyUser_1.verifyUser, task_controller_1.getCompletedTasks);
// @GET - private - /api/tasks/important
router.get("/important", verifyUser_1.verifyUser, task_controller_1.getImportantTasks);
// @POST - private - /api/tasks
router.post("/", verifyUser_1.verifyUser, task_controller_1.addTask);
// @PUT - private - /api/tasks/:id
router.put("/:id", verifyUser_1.verifyUser, task_controller_1.updateTask);
// @DELETE - private - /api/tasks/:id
router.delete("/:id", verifyUser_1.verifyUser, task_controller_1.deleteTask);
exports.default = router;
