import handler from "express-async-handler";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { LoginData } from "../types/t.auth";
import { fromZodError } from "zod-validation-error";
import { signUpSchema } from "../utils/validation";

// @POST - public - /api/auth/sign-up
export const signUp = handler(async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = signUpSchema.parse(req.body);
    const user = new User({ username, password });
    const isUsernameExist = await User.exists({ username: user.username });

    if (isUsernameExist) {
      res.status(400);
      throw new Error("Username already exist");
    }

    const hashedPwd = bcrypt.hashSync(user.password, 10);
    user.password = hashedPwd;
    const token = user.generateToken();
    const savedUser = await user.save();

    res
      .cookie("taskify_access_token", token, {
        httpOnly: true,
        maxAge: 60 * (1000 * 60 * 60 * 24),
        sameSite: "none",
        secure: true,
      })
      .status(201)
      .json({ username: savedUser.username, avatar: savedUser.avatar });
  } catch (error: any) {
    let errorMessage;

    if (error instanceof ZodError) {
      errorMessage = fromZodError(error).toString();
    } else {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
});

// @POST - public - /api/auth/login
export const login = handler(async (req: Request, res: Response): Promise<void> => {
  const { username, password }: LoginData = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(400);
    throw new Error("Invalid username or password");
  }

  const isPasswordMatch: boolean = bcrypt.compareSync(password, user.password);

  if (!isPasswordMatch) {
    res.status(400);
    throw new Error("Invalid username or password");
  }

  const token = user.generateToken();
  res
    .cookie("taskify_access_token", token, {
      httpOnly: true,
      maxAge: 60 * (1000 * 60 * 60 * 24),
      sameSite: "none",
      secure: true,
    })
    .status(201)
    .json({ username: user.username, avatar: user.avatar });
});

// @DELETE - public - /api/auth/logout
export const logout = handler(async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("taskify_access_token").status(200).json({ success: true });
});
