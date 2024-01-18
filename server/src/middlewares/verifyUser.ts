import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { IRequest } from "../types/t.customRequest";
import { Response, NextFunction } from "express";
import User from "../models/user.model";

interface Credentials extends JwtPayload {
  id: string;
}

export const verifyUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.cookies.taskify_access_token) {
    try {
      const token = req.cookies.taskify_access_token;
      const { id }: Credentials = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as Credentials;

      const user: IRequest["user"] = await User.findById(id).select("-password");

      if (!user) {
        throw new Error("Unauthorized");
      }
      req.user = user;
      next();
    } catch (error: any) {
      let errorMessage;
      if (error instanceof JsonWebTokenError) {
        errorMessage = "Invalid Token";
      } else if (error instanceof TokenExpiredError) {
        errorMessage = "Your token is expired. Please try to login again";
      } else {
        errorMessage = error.message;
      }
      res.status(401).clearCookie("taskify_access_token").json({ message: errorMessage });
    }
  } else {
    res.status(401).json({ message: "Token is missing" });
  }
};
