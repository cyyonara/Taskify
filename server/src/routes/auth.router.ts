import express, { IRouter } from "express";
import { signUp, login, logout } from "../controllers/auth.controller";

const router: IRouter = express.Router();

// @POST - public - /api/auth/login
router.post("/login", login);

// @POST - public - /api/auth/sign-up
router.post("/sign-up", signUp);

// @DELETE - public - /api/auth/logout
router.delete("/logout", logout);

export default router;
