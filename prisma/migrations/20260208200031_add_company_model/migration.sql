-- CreateEnum
CREATE TYPE "CompanyStatus" AS ENUM ('ATIVA', 'INATIVA');

-- CreateEnum
CREATE TYPE "InactivationReason" AS ENUM ('INADIMPLENCIA', 'PEDIDO_CLIENTE', 'FALENCIA', 'OUTRO');

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "corporateName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "CompanyStatus" NOT NULL DEFAULT 'ATIVA',
    "inactivationReasons" "InactivationReason"[] DEFAULT ARRAY[]::"InactivationReason"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");
