/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import { UserStatus } from "../../../generated/prisma/enums";
import AppError from "../../errorHelper/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utils/token";

interface iUserRegistrationPayload {
  name: string;
  email: string;
  password: string;
}
const userRegistration = async (payload: iUserRegistrationPayload) => {
  let data: any;

  try {
    const { name, email, password } = payload;

    data = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    if (!data?.user) {
      throw new AppError("Failed to create user account", status.BAD_REQUEST);
    }

    const patient = await prisma.$transaction(async (tx) => {
      const patientTx = await tx.patient.create({
        data: {
          userId: data.user.id,
          name: payload.name,
          email: payload.email,
        },
      });
      return patientTx;
    });

    const accessToken = tokenUtils.getAccessToken({
      userId: data.user.id,
      role: data.user.role,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
      emailVerified: data.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
      userId: data.user.id,
      role: data.user.role,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
      emailVerified: data.user.emailVerified,
    });

    return {
      ...data,
      patient,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.log("Transaction error :", error);

    if (data?.user?.id) {
      await prisma.user.delete({
        where: {
          id: data.user.id,
        },
      });
    }
    throw error;
  }
};

interface iUserLoginPayload {
  email: string;
  password: string;
}
const userLogin = async (payload: iUserLoginPayload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!data.user) {
    throw new AppError("Invalid email or password", status.UNAUTHORIZED);
  }

  if (data.user.status === UserStatus.BLOCKED) {
    throw new AppError("User account is blocked", status.FORBIDDEN);
  }

  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
    throw new AppError("User account is deleted", status.GONE);
  }

  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified,
  });

  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified,
  });

  return {
    ...data,
    accessToken,
    refreshToken,
  };
};

export const authService = {
  userRegistration,
  userLogin,
};
