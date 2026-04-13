import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validationMiddleware = (zodSchema: z.ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsResult = zodSchema.safeParse(req.body);

    if (!parsResult.success) {
      next(parsResult.error);
    }
    req.body = parsResult.data;
    next();
  };
};
