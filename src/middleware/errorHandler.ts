import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = error.name || "Something went wrong";

  if (error.name === "ValidationError") {
    message = "Validation failed";
  }

  res.status(400).json({
    message,
    success: false,
    error: error,
  });
};


export default errorHandler