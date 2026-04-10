import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { SpecialtyRoutes } from "../modules/specialty/specialty.route";
import { UserRoutes } from "../modules/User/user.route";
import { DoctorRoutes } from "../modules/doctor/doctor.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/specialty", SpecialtyRoutes);
router.use("/user", UserRoutes);
router.use("/doctor", DoctorRoutes);

export const indexRouter = router;
