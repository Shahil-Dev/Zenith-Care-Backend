import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { SpecialtyRoutes } from "../modules/specialty/specialty.route";
import { UserRoutes } from "../modules/User/user.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/specialty", SpecialtyRoutes);
router.use("/user", UserRoutes);

export const indexRouter = router;
