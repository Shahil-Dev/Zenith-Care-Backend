import dotenv from "dotenv";
import AppError from "../app/errorHelper/AppError";
import status from "http-status";

dotenv.config();

interface EnvConfig {
  PORT: string;
  NODE_ENV: "development" | "production" | "test";
  DATABASE_URL: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVars = [
    "PORT",
    "NODE_ENV",
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
  ];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new AppError(
        `Environment variable ${varName} is required but not defined.`,
        status.INTERNAL_SERVER_ERROR,
      );
    }
  });

  return {
    PORT: process.env.PORT!,
    NODE_ENV: process.env.NODE_ENV! as "development" | "production" | "test",
    DATABASE_URL: process.env.DATABASE_URL!,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL!,
  };
};

const envConfig = loadEnvVariables();

export default envConfig;
