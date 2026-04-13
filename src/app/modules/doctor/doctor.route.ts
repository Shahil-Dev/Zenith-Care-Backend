import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { validationMiddleware } from "../../middleware/validationMiddleware";
import { updateDoctorZodSchema } from "./doctor.validation";

const router = Router();

router.get("/", DoctorController.getAllDoctors);
router.get("/:id", DoctorController.getDoctorById);
router.put(
  "/:id",
  validationMiddleware(updateDoctorZodSchema),
  DoctorController.updateDoctorById,
);
router.delete("/:id", DoctorController.deleteDoctorById);

export const DoctorRoutes = router;
