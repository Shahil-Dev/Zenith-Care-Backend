import { Request, Response } from "express";
import { CatchAsync } from "../../Shared/CatchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../Shared/sendResponse";
import status from "http-status";

const createDoctor = CatchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserService.createDoctor(payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
});

export const UserController = {
  // Add controller methods here
  createDoctor,
};
