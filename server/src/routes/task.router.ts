import express, { IRouter } from "express";
import { addTask, getTasks } from "../controllers/task.controller";
import { verifyUser } from "../middlewares/verifyUser";

const router: IRouter = express.Router();

// @POST - private - /api/tasks
router.post("/", verifyUser, addTask);

// @GET - private - /api/tasks
router.get("/", verifyUser, getTasks);

export default router;
