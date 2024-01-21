import express, { IRouter } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { changeUsername, changeAvatar } from "../controllers/user.controller";

const router: IRouter = express.Router();

// @PUT - private - /api/user/username
router.put("/username", verifyUser, changeUsername);

// @PUT - private - /api/user/avatar
router.put("/avatar", verifyUser, changeAvatar);
export default router;
