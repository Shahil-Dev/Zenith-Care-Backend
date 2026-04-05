/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";


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
            body: { name, email, password }
        });

        if (!data?.user) {
            throw new Error("Failed to create patient account");
        }

        const patient = await prisma.$transaction(async (tx) => {
            const patientTx = await tx.patient.create({
                data: {
                    userId: data.user.id,
                    name: payload.name,
                    email: payload.email,
                }
            });
            return patientTx;
        });

        return {
            ...data,
            patient
        };
    } catch (error) {
        console.log("Transaction error :", error);

        if (data?.user?.id) {
            await prisma.user.delete({
                where: {
                    id: data.user.id
                }
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









    return data
}





export const authService = {
    userRegistration,
    userLogin
}
