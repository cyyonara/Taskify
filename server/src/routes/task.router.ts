import express, { IRouter } from "express";
import { addTask } from "../controllers/task.controller";
import { verifyUser } from "../middlewares/verifyUser";

const router: IRouter = express.Router();

// @POST - private - /api/task
router.post("/", verifyUser, addTask);

export default router;
