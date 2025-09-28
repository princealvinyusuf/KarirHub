-- Create Enums
CREATE TYPE "Role" AS ENUM ('JOB_SEEKER', 'EMPLOYER', 'ADMIN');
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REVIEWED', 'REJECTED', 'HIRED');

-- Create Tables
CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'JOB_SEEKER',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Company" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "ownerId" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "Company_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "Company_ownerId_idx" ON "Company"("ownerId");

CREATE TABLE "Job" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "location" TEXT,
  "employmentType" TEXT,
  "salaryMin" INTEGER,
  "salaryMax" INTEGER,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "companyId" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "Job_companyId_idx" ON "Job"("companyId");

CREATE TABLE "Application" (
  "id" TEXT PRIMARY KEY,
  "jobId" TEXT NOT NULL,
  "applicantId" TEXT NOT NULL,
  "coverLetter" TEXT,
  "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Application_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "Application_job_applicant_unique" ON "Application"("jobId", "applicantId");
CREATE INDEX "Application_applicantId_idx" ON "Application"("applicantId");

-- Triggers to update updatedAt on update (Postgres function and triggers)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_user_updated_at BEFORE UPDATE ON "User" FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_company_updated_at BEFORE UPDATE ON "Company" FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_job_updated_at BEFORE UPDATE ON "Job" FOR EACH ROW EXECUTE FUNCTION set_updated_at();


