import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { role, UserStatus } from "../../generated/prisma/enums";
import envConfig from "../../config/env";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: envConfig.BETTER_AUTH_URL || "http://localhost:5000",
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: role.PATIENT,
      },
      status: {
        type: "string",
        required: true,
        defaultValue: UserStatus.ACTIVE,
      },
      needPasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
      deletedAt: {
        type: "date",
        required: false,
      },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 60 * 24,
    },
    expiresIn: 60 * 60 * 60 * 24,
    updateAge: 60 * 60 * 60 * 24,
  },

  advanced: {
    disableCSRFCheck: true,
  },
  trustedOrigins: [envConfig.BETTER_AUTH_URL || "http://localhost:5000"],
});
