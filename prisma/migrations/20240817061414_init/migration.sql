-- CreateTable
CREATE TABLE "EmailVerificationRequest" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailVerificationRequest_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationRequest_token_key" ON "EmailVerificationRequest"("token");

-- CreateIndex
CREATE INDEX "EmailVerificationRequest_identifier_idx" ON "EmailVerificationRequest"("identifier");
