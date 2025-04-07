/*
  Warnings:

  - You are about to drop the column `conclucsion` on the `Posts` table. All the data in the column will be lost.
  - Added the required column `conclusion` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "conclucsion",
ADD COLUMN     "conclusion" TEXT NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;
