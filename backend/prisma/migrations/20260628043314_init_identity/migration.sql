/*
  Warnings:

  - The values [SUSPENDED] on the enum `BranchStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `businessType` column on the `organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `action` on the `permissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."BusinessType" AS ENUM ('RETAIL', 'WHOLESALE', 'SERVICE', 'MANUFACTURING', 'DISTRIBUTOR', 'FREELANCER', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."PermissionAction" AS ENUM ('VIEW', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT', 'APPROVE', 'MANAGE');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."BranchStatus_new" AS ENUM ('ACTIVE', 'INACTIVE');
ALTER TABLE "public"."branches" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."branches" ALTER COLUMN "status" TYPE "public"."BranchStatus_new" USING ("status"::text::"public"."BranchStatus_new");
ALTER TYPE "public"."BranchStatus" RENAME TO "BranchStatus_old";
ALTER TYPE "public"."BranchStatus_new" RENAME TO "BranchStatus";
DROP TYPE "public"."BranchStatus_old";
ALTER TABLE "public"."branches" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterEnum
ALTER TYPE "public"."MembershipStatus" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "public"."organizations" DROP COLUMN "businessType",
ADD COLUMN     "businessType" "public"."BusinessType";

-- AlterTable
ALTER TABLE "public"."permissions" DROP COLUMN "action",
ADD COLUMN     "action" "public"."PermissionAction" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "permissions_module_action_key" ON "public"."permissions"("module", "action");
