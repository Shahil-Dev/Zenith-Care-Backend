import status from "http-status";
import z from "zod";
import { IErrorResponse, TErrorSource } from "../../Interface/error.intrerface";

export const handleZodError = (err: z.ZodError): IErrorResponse => {
  const statusCode = status.BAD_REQUEST;
  const message = "Validation Error";
  const errorSources: TErrorSource[] = [];

  err.issues.forEach((issue) => {
    errorSources.push({
      path:
        issue.path.length > 1
          ? issue.path.join(" => ")
          : issue.path[0].toString(),
      message: issue.message,
    });
  });

  return {
    statusCode,
    success: false,
    message,
    errorSources,
  };
};
