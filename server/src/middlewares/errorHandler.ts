import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({ message: "Resource not found" });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message || "Internal Server Error" });
};
