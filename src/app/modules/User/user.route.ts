import { Router } from "express";
import { UserController } from "./user.controller";
import { validationMiddleware } from "../../middleware/validationMiddleware";
import { createDoctorZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/create-doctor",
  validationMiddleware(createDoctorZodSchema),
  UserController.createDoctor,
);
// router.post("/create-doctor", UserController.createDoctor)
// router.post("/create-doctor", UserController.createDoctor)

export const UserRoutes = router;
