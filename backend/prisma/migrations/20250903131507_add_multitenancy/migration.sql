/*
  Warnings:

  - A unique constraint covering the columns `[tenantId,email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tenantId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."users_email_key";

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "tenantId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."tenants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_name_key" ON "public"."tenants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_slug_key" ON "public"."tenants"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_tenantId_email_key" ON "public"."users"("tenantId", "email");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
