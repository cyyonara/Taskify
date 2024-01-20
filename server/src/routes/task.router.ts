import express, { IRouter } from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  getCompletedTasks,
  getImportantTasks,
  updateTask,
} from "../controllers/task.controller";
import { verifyUser } from "../middlewares/verifyUser";

const router: IRouter = express.Router();

// @GET - private - /api/tasks
router.get("/", verifyUser, getTasks);

// @GET - private - /api/tasks/completed
router.get("/completed", verifyUser, getCompletedTasks);

// @GET - private - /api/tasks/important
router.get("/important", verifyUser, getImportantTasks);

// @POST - private - /api/tasks
router.post("/", verifyUser, addTask);

// @PUT - private - /api/tasks/:id
router.put("/:id", verifyUser, updateTask);

// @DELETE - private - /api/tasks/:id
router.delete("/:id", verifyUser, deleteTask);

export default router;
