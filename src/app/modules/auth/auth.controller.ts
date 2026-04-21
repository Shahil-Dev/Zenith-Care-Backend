import { Request, Response } from "express";
import { CatchAsync } from "../../Shared/CatchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../Shared/sendResponse";
import { tokenUtils } from "../../utils/token";

const registrationPestilent = CatchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    console.log(payload);
    const result = await authService.userRegistration(payload);
    const { accessToken, refreshToken, token, ...rest } = result;
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, token);

    sendResponse(res, {
      httpStatusCode: 201,
      success: true,
      message: "User registered successfully",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest,
      },
    });
  },
);

const loginPestilent = CatchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authService.userLogin(payload);

  const { accessToken, refreshToken, token, ...rest } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

export const authController = {
  registrationPestilent,
  loginPestilent,
};
