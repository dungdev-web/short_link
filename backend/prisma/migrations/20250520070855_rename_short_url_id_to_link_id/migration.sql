/*
  Warnings:

  - You are about to drop the column `short_url_id` on the `posts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_short_url_id_fkey";

-- DropIndex
DROP INDEX "idx_posts_short_url_id";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "short_url_id",
ADD COLUMN     "link_id" INTEGER;

-- CreateIndex
CREATE INDEX "idx_posts_link_id" ON "posts"("link_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE SET NULL ON UPDATE CASCADE;
