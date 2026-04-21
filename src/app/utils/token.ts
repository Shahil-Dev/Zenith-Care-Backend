import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import envConfig from "../../config/env";
import { CookieUtils } from "./cookie";
import { Response } from "express";

const getAccessToken = (payload: JwtPayload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    envConfig.ACCESS_TOKEN_SECRET,
    { expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN } as SignOptions,
  );
  return accessToken;
};

const getRefreshToken = (payload: JwtPayload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    envConfig.ACCESS_TOKEN_SECRET,
    { expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN } as SignOptions,
  );
  return refreshToken;
};

const setAccessTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",

    maxAge: 60 * 60 * 60 * 24,
  });
};

const setRefreshTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 60 * 24 * 7,
  });
};

const setBetterAuthSessionCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 60 * 24,
  });
};

export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setBetterAuthSessionCookie,
  setAccessTokenCookie,
  setRefreshTokenCookie,
};
