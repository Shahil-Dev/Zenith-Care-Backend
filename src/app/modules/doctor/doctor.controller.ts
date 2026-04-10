import { Request, Response } from "express";
import { CatchAsync } from "../../Shared/CatchAsync";
import { sendResponse } from "../../Shared/sendResponse";
import { doctorService } from "./doctor.service";
import status from "http-status";
//get all doctors with their specialties and user information
const getAllDoctors = CatchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.getAllDoctors();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctors retrieved successfully",
    data: result,
  });
});

//get doctor by id with their specialties and user information
const getDoctorById = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await doctorService.getDoctorById(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor retrieved successfully",
    data: result,
  });
});

//update doctor by id
const updateDoctorById = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const result = await doctorService.updateDoctorById(id as string, data);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor updated successfully",
    data: result,
  });
});

//delete doctor by id
const deleteDoctorById = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await doctorService.deleteDoctorById(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
});

export const DoctorController = {
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
};
