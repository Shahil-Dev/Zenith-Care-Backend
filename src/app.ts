import express, { Application, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";
import { SpecialtyRoutes } from "./app/module/specialty/specialty.route";

const app: Application = express();


// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api/v1/specialty", SpecialtyRoutes);

// Basic route
app.get('/', async(req: Request, res: Response) => {
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


export default app;