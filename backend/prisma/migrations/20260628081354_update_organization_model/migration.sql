/*
  Warnings:

  - Added the required column `country` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."organizations" ADD COLUMN     "country" VARCHAR(100) NOT NULL,
ADD COLUMN     "timezone" VARCHAR(100),
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
