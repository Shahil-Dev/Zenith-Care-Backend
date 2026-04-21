import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { role, UserStatus } from "../../generated/prisma/enums";
import envConfig from "../../config/env";
import ms, { StringValue } from "ms";

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
      maxAge:
        ms(envConfig.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN as StringValue) /
        1000,
    },
    expiresIn: ms(
      envConfig.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN as StringValue,
    ),
    updateAge: ms(
      envConfig.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE as StringValue,
    ),
  },

  advanced: {
    disableCSRFCheck: true,
  },
  trustedOrigins: [envConfig.BETTER_AUTH_URL || "http://localhost:5000"],
});
