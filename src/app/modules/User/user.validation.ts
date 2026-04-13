import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
  doctor: z.object({
    name: z.string("Name is required"),
    email: z.string("Email is required").email("Invalid email format"),
    profilePhoto: z
      .string("Profile photo URL is required")
      .url("Invalid URL format"),
    contactNumber: z
      .string("Contact number is required")
      .regex(/^\+8801[3-9]\d{8}$/, "Invalid Bangladeshi phone number format"),
    address: z.string("Address is required"),
    registrationNumber: z.string("Registration number is required"),
    experience: z
      .int("Experience is required")
      .min(0, "Experience must be a positive number")
      .max(50, "Experience must be at most 50")
      .optional(),
    gender: z.enum(
      [Gender.MALE, Gender.FEMALE],
      "Gender must be either MALE or FEMALE",
    ),
    appointments: z
      .number("Appointments is required")
      .nonnegative("Appointments must be a non-negative number"),
    qualifications: z
      .string("Qualifications are required")
      .min(10, "Qualifications must be at least 10 characters long")
      .max(1000, "Qualifications must be at most 1000 characters long"),
    currentWorkplace: z
      .string("Current workplace is required")
      .min(5, "Current workplace must be at least 5 characters long")
      .max(200, "Current workplace must be at most 200 characters long"),
    designation: z
      .string("Designation is required")
      .min(3, "Designation must be at least 3 characters long"),
  }),
  specialties: z
    .array(
      z.uuid(),
      "Specialty must be an array of valid UUIDs representing specialty IDs",
    )
    .min(1, "At least one specialty is required"),
});
