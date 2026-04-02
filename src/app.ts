/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";
import { indexRouter } from "./app/routers";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";

const app: Application = express();


app.use(express.urlencoded({ extended: true }));


app.use(express.json());



app.use("/api/v1", indexRouter);

// Basic route
app.get('/', async (req: Request, res: Response) => {
    const specialty = await prisma.specialty.create({
        data: {
            title: "Zoology"
        }
    });
    res.status(200).json({
        success: true,
        message: 'API is working',
        data: specialty
    });
});

app.use(globalErrorHandler);
app.use(notFound)



export default app;