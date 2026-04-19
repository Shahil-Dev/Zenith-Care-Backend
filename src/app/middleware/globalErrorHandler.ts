/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import envConfig from "../../config/env";
import z from "zod";
import status from "http-status";
import env from "../../config/env";
import { TErrorSource } from "../../Interface/error.intrerface";
import { handleZodError } from "../errorHelper/handleZodError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envConfig.NODE_ENV === "development") {
    console.log("error from global error handler", err);
  }
  let errorSources: TErrorSource[] = [];
  let statusCode: number = err.statusCode || 500;
  let message: string = err.message || "Internal Server Error";
  //   const errors = err.errors || [];
  if (err instanceof z.ZodError) {
    statusCode = status.BAD_REQUEST;
    message = "Validation Error";
    err.issues.forEach((issue) => {
      const simplifiedError = handleZodError(err);
      statusCode = simplifiedError.statusCode || statusCode;
      message = simplifiedError.message || message;
      errorSources = [...simplifiedError.errorSources];
    });
  }

  const errorResponse = {
    success: false,
    message: message,
    statusCode: statusCode,
    errorSources: errorSources,
    error: env.NODE_ENV === "development" ? err : undefined,
  };

  res.status(statusCode).json(errorResponse);
};
