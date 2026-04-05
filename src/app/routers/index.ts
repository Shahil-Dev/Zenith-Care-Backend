import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { SpecialtyRoutes } from "../modules/specialty/specialty.route";

const router = Router()


router.use("/auth", authRoute)
router.use("/specialty", SpecialtyRoutes);




export const indexRouter = router;