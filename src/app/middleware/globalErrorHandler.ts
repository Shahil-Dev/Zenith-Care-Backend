/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import envConfig from "../../config/env";
import z from "zod";
import status from "http-status";
import env from "../../config/env";
import { TErrorSource } from "../../Interface/error.intrerface";
import { handleZodError } from "../errorHelper/handleZodError";
import AppError from "../errorHelper/AppError";

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
  let stack: string | undefined;
  //   const errors = err.errors || [];
  if (err instanceof z.ZodError) {
    statusCode = status.BAD_REQUEST;
    message = "Validation Error";
    err.issues.forEach((issue) => {
      const simplifiedError = handleZodError(err);
      statusCode = simplifiedError.statusCode || statusCode;
      message = simplifiedError.message || message;
      errorSources = [...simplifiedError.errorSources];
      stack = err.stack;
    });
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  const errorResponse = {
    success: false,
    message: message,
    statusCode: statusCode,
    errorSources: errorSources,
    stack: env.NODE_ENV === "development" ? stack : undefined,
    error: env.NODE_ENV === "development" ? err : undefined,
  };

  res.status(statusCode).json(errorResponse);
};
