import { Request, Response } from "express";
import { CatchAsync } from "../../Shared/CatchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../Shared/sendResponse";


const registrationPestilent = CatchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    console.log(payload)
    const result = await authService.userRegistration(payload);

    sendResponse(res, {
        httpStatusCode: 201,
        success: true,
        message: "User registered successfully",
        data: result
    })

})



export const authController = {
    registrationPestilent
}