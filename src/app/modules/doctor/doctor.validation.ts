import z from "zod";

export const updateDoctorZodSchema = z
  .object({
    password: z
      .string("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long")
      .optional(),
    doctor: z.object({
      name: z.string("Name is required").optional(),
      email: z
        .string("Email is required")
        .email("Invalid email format")
        .optional(),
      profilePhoto: z
        .string("Profile photo URL is required")
        .url("Invalid URL format")
        .optional(),
      contactNumber: z.string("Contact number is required"),
      address: z.string("Address is required").optional(),
      registrationNumber: z
        .string("Registration number is required")
        .optional(),
      experience: z
        .int("Experience is required")
        .min(0, "Experience must be a positive number")
        .max(50, "Experience must be at most 50")
        .optional(),
      gender: z.enum(["MALE", "FEMALE"]).optional(),
      appointments: z
        .number("Appointments is required")
        .nonnegative("Appointments must be a non-negative number")
        .optional(),
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
        .min(3, "Designation must be at least 3 characters long")
        .optional(),
    }),

    specialties: z.array(z.uuid()).min(1, "At least one specialty is required"),
  })
;
