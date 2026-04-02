import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";


interface iUserRegistrationPayload {
    name: string;
    email: string;
    password: string;
}
const userRegistration = async (payload: iUserRegistrationPayload) => {
    const { name, email, password } = payload;

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        }
    })

    if (!data.user) {
        throw new Error("Failed to create patient account")
    }
    return data

}

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
        }
    })


    if (!data.user) {
        throw new Error("Failed to login  account")
    }

    if (data.user.status === UserStatus.BLOCKED) {
        throw new Error("User account is blocked")
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("User account is deleted")
    }

    const patient = await prisma.$transaction(async (tx) => {
      await tx.patient.create({
        data: {
            userId: data.user.id,
            name: payload.name,
            email: payload.email,
        }
      })
    })







    return data
}





export const authService = {
    userRegistration,
    userLogin
}
