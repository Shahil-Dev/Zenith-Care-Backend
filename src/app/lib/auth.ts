import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite",
    }),

    emailAndPassword: {
        enabled: true,
    },
    
    user: {
        additionalFields: {

            Role: {
                type: "string",
                required: true,
                defaultValue: Role.PESTILENT,
            },

            UserStatus: {
                type: "string",
                required: true,
                defaultValue: UserStatus.ACTIVE,
            }
            ,
            needChangePassword: {
                type: "boolean",
                required: true,
                defaultValue: false
            },

            isDeleted: {
                type: "boolean",
                required: true,
                defaultValue: false
            }
            ,
            deletedAt: {
                type: "date",
                required: false,
            }
        }
    }
});