import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router()


router.post("/registration", authController.registrationPestilent)

export const authRoute = router