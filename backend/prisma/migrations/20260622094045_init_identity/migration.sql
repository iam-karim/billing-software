-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('PENDING_VERIFICATION', 'ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "public"."OrganizationStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."BranchStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "public"."MembershipStatus" AS ENUM ('INVITED', 'ACTIVE', 'SUSPENDED', 'LEFT');

-- CreateEnum
CREATE TYPE "public"."PermissionModule" AS ENUM ('USERS', 'ORGANIZATIONS', 'BRANCHES', 'CLIENTS', 'PRODUCTS', 'INVOICES', 'PAYMENTS', 'REPORTS', 'SETTINGS');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "displayName" VARCHAR(200) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(30),
    "passwordHash" VARCHAR(255) NOT NULL,
    "avatarFileId" UUID,
    "status" "public"."UserStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "emailVerifiedAt" TIMESTAMP(3),
    "phoneVerifiedAt" TIMESTAMP(3),
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."organizations" (
    "id" UUID NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "legalName" VARCHAR(255),
    "slug" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255),
    "phone" VARCHAR(30),
    "website" VARCHAR(255),
    "industry" VARCHAR(100),
    "businessType" VARCHAR(100),
    "logoFileId" UUID,
    "status" "public"."OrganizationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."branches" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "code" VARCHAR(20),
    "email" VARCHAR(255),
    "phone" VARCHAR(30),
    "address" TEXT,
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "country" VARCHAR(100),
    "postalCode" VARCHAR(20),
    "invoicePrefix" VARCHAR(20),
    "status" "public"."BranchStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."memberships" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "roleId" UUID NOT NULL,
    "branchId" UUID,
    "employeeCode" VARCHAR(50),
    "jobTitle" VARCHAR(100),
    "status" "public"."MembershipStatus" NOT NULL DEFAULT 'ACTIVE',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."permissions" (
    "id" UUID NOT NULL,
    "module" "public"."PermissionModule" NOT NULL,
    "action" VARCHAR(50) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role_permissions" (
    "id" UUID NOT NULL,
    "roleId" UUID NOT NULL,
    "permissionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "public"."users"("status");

-- CreateIndex
CREATE INDEX "users_deletedAt_idx" ON "public"."users"("deletedAt");

-- CreateIndex
CREATE INDEX "users_createdAt_idx" ON "public"."users"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_slug_key" ON "public"."organizations"("slug");

-- CreateIndex
CREATE INDEX "organizations_status_idx" ON "public"."organizations"("status");

-- CreateIndex
CREATE INDEX "organizations_deletedAt_idx" ON "public"."organizations"("deletedAt");

-- CreateIndex
CREATE INDEX "organizations_createdAt_idx" ON "public"."organizations"("createdAt");

-- CreateIndex
CREATE INDEX "branches_organizationId_idx" ON "public"."branches"("organizationId");

-- CreateIndex
CREATE INDEX "branches_status_idx" ON "public"."branches"("status");

-- CreateIndex
CREATE INDEX "branches_deletedAt_idx" ON "public"."branches"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "branches_organizationId_code_key" ON "public"."branches"("organizationId", "code");

-- CreateIndex
CREATE INDEX "memberships_userId_idx" ON "public"."memberships"("userId");

-- CreateIndex
CREATE INDEX "memberships_organizationId_idx" ON "public"."memberships"("organizationId");

-- CreateIndex
CREATE INDEX "memberships_roleId_idx" ON "public"."memberships"("roleId");

-- CreateIndex
CREATE INDEX "memberships_branchId_idx" ON "public"."memberships"("branchId");

-- CreateIndex
CREATE INDEX "memberships_status_idx" ON "public"."memberships"("status");

-- CreateIndex
CREATE INDEX "memberships_deletedAt_idx" ON "public"."memberships"("deletedAt");

-- CreateIndex
CREATE INDEX "roles_organizationId_idx" ON "public"."roles"("organizationId");

-- CreateIndex
CREATE INDEX "roles_deletedAt_idx" ON "public"."roles"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "roles_organizationId_name_key" ON "public"."roles"("organizationId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_code_key" ON "public"."permissions"("code");

-- CreateIndex
CREATE INDEX "permissions_module_idx" ON "public"."permissions"("module");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_module_action_key" ON "public"."permissions"("module", "action");

-- CreateIndex
CREATE INDEX "role_permissions_roleId_idx" ON "public"."role_permissions"("roleId");

-- CreateIndex
CREATE INDEX "role_permissions_permissionId_idx" ON "public"."role_permissions"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_roleId_permissionId_key" ON "public"."role_permissions"("roleId", "permissionId");

-- AddForeignKey
ALTER TABLE "public"."branches" ADD CONSTRAINT "branches_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memberships" ADD CONSTRAINT "memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memberships" ADD CONSTRAINT "memberships_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memberships" ADD CONSTRAINT "memberships_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memberships" ADD CONSTRAINT "memberships_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."roles" ADD CONSTRAINT "roles_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
