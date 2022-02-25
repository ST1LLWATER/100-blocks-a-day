/*
  Warnings:

  - The primary key for the `blocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `blocks` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `blocks` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `blocks` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `blocks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,blockindex]` on the table `blocks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blockindex` to the `blocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `blocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waketime` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_pkey",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "blockindex" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "waketime" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "blockdata" (
    "id" SERIAL NOT NULL,
    "isproductive" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "blockindex" INTEGER NOT NULL,
    "blockdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blockdata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blocks_date_blockindex_key" ON "blocks"("date", "blockindex");

-- AddForeignKey
ALTER TABLE "blockdata" ADD CONSTRAINT "blockdata_blockindex_blockdate_fkey" FOREIGN KEY ("blockindex", "blockdate") REFERENCES "blocks"("blockindex", "date") ON DELETE RESTRICT ON UPDATE CASCADE;
