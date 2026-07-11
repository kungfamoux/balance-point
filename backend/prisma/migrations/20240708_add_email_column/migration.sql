-- AlterTable
ALTER TABLE "profiles" ADD COLUMN "email" TEXT;
UPDATE "profiles" SET "email" = 'user_' || id || '@temp.example.com';
ALTER TABLE "profiles" ALTER COLUMN "email" SET NOT NULL;
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");
