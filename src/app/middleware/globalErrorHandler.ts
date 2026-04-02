/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import envConfig from "../../config/env"





export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (envConfig.NODE_ENV === "development") {
        console.log("error from global error handler", err)
    }

    const statusCode: number = err.statusCode || 500;
    const message: string = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message: message,
        error: err.message
    })
}