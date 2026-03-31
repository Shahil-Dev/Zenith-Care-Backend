-- CreateEnum
CREATE TYPE "role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'DOCTOR', 'PATIENT');

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'PATIENT';

-- DropEnum
DROP TYPE "Role";
