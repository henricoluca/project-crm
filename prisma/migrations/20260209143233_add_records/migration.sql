-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('APRESENTACAO', 'ORCAMENTO', 'NOTA_FISCAL', 'OUTRO');

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "sentDate" TIMESTAMP(3) NOT NULL,
    "lectureConfirmation" BOOLEAN NOT NULL DEFAULT false,
    "type" "RecordType" NOT NULL,
    "observation" TEXT NOT NULL,
    "companyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Record_companyId_idx" ON "Record"("companyId");

-- CreateIndex
CREATE INDEX "Record_createdById_idx" ON "Record"("createdById");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
