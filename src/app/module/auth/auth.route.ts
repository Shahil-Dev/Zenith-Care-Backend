import { Router } from "express";
import { authController } from "./auth.controller";



const router = Router()


router.post("/registration", authController.registrationPestilent)
router.post("/login", authController.loginPestilent)






export const authRoute = router