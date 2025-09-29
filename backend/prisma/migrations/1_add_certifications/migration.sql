-- Create CertificationProgram table
CREATE TABLE "CertificationProgram" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "provider" TEXT,
  "description" TEXT,
  "link" TEXT,
  "startDate" TIMESTAMP,
  "endDate" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Ensure trigger updates updatedAt on updates (function set_updated_at exists from 0_init)
CREATE TRIGGER set_certification_program_updated_at
BEFORE UPDATE ON "CertificationProgram"
FOR EACH ROW EXECUTE FUNCTION set_updated_at();


