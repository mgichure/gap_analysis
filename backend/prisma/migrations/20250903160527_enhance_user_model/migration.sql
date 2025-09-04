/*
  Warnings:

  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tenantId,employeeId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `tenants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TenantType" AS ENUM ('BANK', 'MICROFINANCE', 'SACCO', 'INSURANCE', 'FINTECH', 'REGULATOR');

-- CreateEnum
CREATE TYPE "public"."TenantStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'COMPLIANCE_REVIEW', 'DEACTIVATED');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('SUPER_ADMIN', 'TENANT_ADMIN', 'COMPLIANCE_OFFICER', 'RISK_MANAGER', 'AUDITOR', 'IT_SECURITY', 'BRANCH_MANAGER', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "public"."RiskCategory" AS ENUM ('OPERATIONAL', 'FINANCIAL', 'COMPLIANCE', 'STRATEGIC', 'TECHNOLOGY', 'REPUTATIONAL');

-- CreateEnum
CREATE TYPE "public"."RiskLikelihood" AS ENUM ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "public"."RiskImpact" AS ENUM ('MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."RiskStatus" AS ENUM ('IDENTIFIED', 'ASSESSED', 'MITIGATED', 'ACCEPTED', 'MONITORED');

-- CreateEnum
CREATE TYPE "public"."ActionType" AS ENUM ('REMEDIATION', 'PREVENTIVE', 'CORRECTIVE', 'IMPROVEMENT');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."ActionStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'VERIFIED');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "public"."EmploymentStatus" AS ENUM ('ACTIVE', 'PROBATION', 'SUSPENDED', 'TERMINATED', 'RETIRED', 'ON_LEAVE');

-- CreateEnum
CREATE TYPE "public"."WorkSchedule" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN', 'FREELANCE');

-- CreateEnum
CREATE TYPE "public"."PerformanceRating" AS ENUM ('EXCELLENT', 'GOOD', 'AVERAGE', 'BELOW_AVERAGE', 'UNSATISFACTORY');

-- CreateEnum
CREATE TYPE "public"."ComplianceType" AS ENUM ('INTERNATIONAL', 'REGIONAL', 'LOCAL', 'REGULATORY');

-- CreateEnum
CREATE TYPE "public"."ComplianceStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'UNDER_REVIEW', 'CERTIFIED', 'EXPIRED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "public"."EncryptionLevel" AS ENUM ('AES_128', 'AES_256', 'AES_512');

-- CreateEnum
CREATE TYPE "public"."BackupFrequency" AS ENUM ('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY');

-- DropIndex
DROP INDEX "public"."tenants_name_key";

-- AlterTable
ALTER TABLE "public"."tenants" ADD COLUMN     "address" TEXT,
ADD COLUMN     "annualRevenue" DECIMAL(15,2),
ADD COLUMN     "backupFrequency" "public"."BackupFrequency" NOT NULL DEFAULT 'DAILY',
ADD COLUMN     "complianceScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "customerCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "dataRetentionDays" INTEGER NOT NULL DEFAULT 2555,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "employeeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "encryptionLevel" "public"."EncryptionLevel" NOT NULL DEFAULT 'AES_256',
ADD COLUMN     "lastAuditDate" TIMESTAMP(3),
ADD COLUMN     "licenseNumber" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "regulator" TEXT,
ADD COLUMN     "status" "public"."TenantStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "type" "public"."TenantType" NOT NULL,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "accountLocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "auditFindings" TEXT[],
ADD COLUMN     "branchId" TEXT,
ADD COLUMN     "complianceCertifications" TEXT[],
ADD COLUMN     "complianceScore" INTEGER,
ADD COLUMN     "costCenter" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "department" TEXT,
ADD COLUMN     "emergencyContact" TEXT,
ADD COLUMN     "emergencyPhone" TEXT,
ADD COLUMN     "emergencyRelationship" TEXT,
ADD COLUMN     "employeeId" TEXT,
ADD COLUMN     "employeeNumber" TEXT,
ADD COLUMN     "employmentStatus" "public"."EmploymentStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" "public"."Gender",
ADD COLUMN     "hireDate" TIMESTAMP(3),
ADD COLUMN     "homeAddress" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "lastActivity" TIMESTAMP(3),
ADD COLUMN     "lastAuditDate" TIMESTAMP(3),
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "lastPerformanceReview" TIMESTAMP(3),
ADD COLUMN     "lastTrainingDate" TIMESTAMP(3),
ADD COLUMN     "mfaEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "mobile" TEXT,
ADD COLUMN     "nextTrainingDate" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "passwordChangedAt" TIMESTAMP(3),
ADD COLUMN     "performanceRating" "public"."PerformanceRating",
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "preferences" JSONB,
ADD COLUMN     "riskAssessmentScore" INTEGER,
ADD COLUMN     "role" "public"."UserRole" NOT NULL,
ADD COLUMN     "salaryGrade" TEXT,
ADD COLUMN     "supervisorId" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "trainingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "trainingHistory" TEXT[],
ADD COLUMN     "trainingScore" INTEGER,
ADD COLUMN     "workAddress" TEXT,
ADD COLUMN     "workSchedule" "public"."WorkSchedule";

-- CreateTable
CREATE TABLE "public"."branches" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "customerCount" INTEGER NOT NULL DEFAULT 0,
    "transactionVolume" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "timezone" TEXT NOT NULL DEFAULT 'Africa/Nairobi',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "openingHours" TEXT,
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."departments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "headId" TEXT,
    "primaryComplianceFramework" TEXT,
    "riskTolerance" TEXT,
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."compliance_frameworks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "type" "public"."ComplianceType" NOT NULL,
    "regulator" TEXT,
    "status" "public"."ComplianceStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "certificationDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "nextAuditDate" TIMESTAMP(3),
    "currentScore" INTEGER NOT NULL DEFAULT 0,
    "targetScore" INTEGER NOT NULL DEFAULT 100,
    "gapCount" INTEGER NOT NULL DEFAULT 0,
    "riskCount" INTEGER NOT NULL DEFAULT 0,
    "totalRequirements" INTEGER NOT NULL DEFAULT 0,
    "implementedRequirements" INTEGER NOT NULL DEFAULT 0,
    "pendingRequirements" INTEGER NOT NULL DEFAULT 0,
    "policyDocuments" TEXT[],
    "procedures" TEXT[],
    "forms" TEXT[],
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "compliance_frameworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."risks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."RiskCategory" NOT NULL,
    "subcategory" TEXT,
    "likelihood" "public"."RiskLikelihood" NOT NULL,
    "impact" "public"."RiskImpact" NOT NULL,
    "inherentRiskScore" INTEGER NOT NULL,
    "status" "public"."RiskStatus" NOT NULL DEFAULT 'IDENTIFIED',
    "mitigationStrategy" TEXT,
    "residualRiskScore" INTEGER,
    "regulatoryImpact" BOOLEAN NOT NULL DEFAULT false,
    "customerImpact" BOOLEAN NOT NULL DEFAULT false,
    "financialImpact" DECIMAL(15,2),
    "ownerId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "linkedFrameworks" TEXT[],
    "auditFindings" TEXT,
    "identifiedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "targetMitigationDate" TIMESTAMP(3),
    "lastReviewDate" TIMESTAMP(3),
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "risks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."actions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "public"."ActionType" NOT NULL,
    "priority" "public"."Priority" NOT NULL DEFAULT 'MEDIUM',
    "regulatoryDeadline" TIMESTAMP(3),
    "complianceImpact" BOOLEAN NOT NULL DEFAULT false,
    "status" "public"."ActionStatus" NOT NULL DEFAULT 'PLANNED',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "assigneeId" TEXT NOT NULL,
    "reviewerId" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "completedDate" TIMESTAMP(3),
    "estimatedHours" INTEGER,
    "actualHours" INTEGER,
    "budget" DECIMAL(15,2),
    "linkedRisks" TEXT[],
    "evidenceRequired" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "updates" TEXT[],
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."evidence" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT[],
    "linkedRequirement" TEXT,
    "linkedRisk" TEXT,
    "linkedAction" TEXT,
    "uploadedBy" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedBy" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "verificationNotes" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "accessLevel" TEXT NOT NULL DEFAULT 'RESTRICTED',
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."assessments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "framework" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "methodology" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "achievedScore" INTEGER NOT NULL,
    "gapScore" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "nextAssessmentDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'PLANNED',
    "assessor" TEXT NOT NULL,
    "participants" TEXT[],
    "findings" TEXT[],
    "recommendations" TEXT[],
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."audit_logs" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "userId" TEXT,
    "userEmail" TEXT,
    "userRole" TEXT,
    "oldValues" JSONB,
    "newValues" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."compliance_reports" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "findings" TEXT[],
    "recommendations" TEXT[],
    "actionItems" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "preparedBy" TEXT NOT NULL,
    "reviewedBy" TEXT,
    "approvedBy" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "submittedDate" TIMESTAMP(3),
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "compliance_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ActionAssignee" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActionAssignee_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_ActionReviewedBy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActionReviewedBy_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "branches_tenantId_code_key" ON "public"."branches"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "departments_tenantId_code_key" ON "public"."departments"("tenantId", "code");

-- CreateIndex
CREATE INDEX "_ActionAssignee_B_index" ON "public"."_ActionAssignee"("B");

-- CreateIndex
CREATE INDEX "_ActionReviewedBy_B_index" ON "public"."_ActionReviewedBy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "users_tenantId_employeeId_key" ON "public"."users"("tenantId", "employeeId");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."branches" ADD CONSTRAINT "branches_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."departments" ADD CONSTRAINT "departments_headId_fkey" FOREIGN KEY ("headId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."departments" ADD CONSTRAINT "departments_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."compliance_frameworks" ADD CONSTRAINT "compliance_frameworks_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risks" ADD CONSTRAINT "risks_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risks" ADD CONSTRAINT "risks_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risks" ADD CONSTRAINT "risks_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."actions" ADD CONSTRAINT "actions_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."actions" ADD CONSTRAINT "actions_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."actions" ADD CONSTRAINT "actions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."evidence" ADD CONSTRAINT "evidence_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."assessments" ADD CONSTRAINT "assessments_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."audit_logs" ADD CONSTRAINT "audit_logs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."compliance_reports" ADD CONSTRAINT "compliance_reports_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ActionAssignee" ADD CONSTRAINT "_ActionAssignee_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ActionAssignee" ADD CONSTRAINT "_ActionAssignee_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ActionReviewedBy" ADD CONSTRAINT "_ActionReviewedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ActionReviewedBy" ADD CONSTRAINT "_ActionReviewedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
