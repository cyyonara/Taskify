import handler from "express-async-handler";
import User from "../models/user.model";
import { IRequest } from "../types/t.customRequest";
import { Response } from "express";
import { z, ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const usernameSchema = z.string().min(2).max(30);

// @PUT - private - /api/user/username
export const changeUsername = handler(
  async (req: IRequest, res: Response): Promise<void> => {
    try {
      const { username }: { username: string } = req.body;
      const validateUsername = usernameSchema.parse(username);

      const user = await User.findOne({ _id: { $ne: req.user?._id }, username });

      if (user) {
        res.status(400);
        throw new Error("Username already in use. Try another one");
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user?.id,
        {
          $set: { username: validateUsername },
        },
        { new: true }
      );

      res
        .status(201)
        .json({ username: updatedUser?.username, avatar: updatedUser?.avatar });
    } catch (error: any) {
      let errorMessage;

      if (error instanceof ZodError) {
        errorMessage = fromZodError(error).toString();
        res.status(400);
      } else {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }
);

const avatarSchema = z.string().url();

// @PUT - private - /api/user/avatar
export const changeAvatar = handler(
  async (req: IRequest, res: Response): Promise<void> => {
    try {
      const { avatar }: { avatar: string } = req.body;

      const validatedAvatarUrl = avatarSchema.parse(avatar);
      console.log(validatedAvatarUrl);
      const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
          $set: { avatar: validatedAvatarUrl },
        },
        { new: true }
      );

      res
        .status(201)
        .json({ username: updatedUser?.username, avatar: updatedUser?.avatar });
    } catch (error: any) {
      let errorMessage;

      if (error instanceof ZodError) {
        errorMessage = "Avatar must be a valid url";
        res.status(400);
      } else {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }
);
