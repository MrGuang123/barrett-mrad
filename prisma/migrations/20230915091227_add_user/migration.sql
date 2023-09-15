/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "SystemUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "remark" INTEGER,
    "dept_id" INTEGER NOT NULL,
    "post_ids" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" INTEGER NOT NULL,
    "sex" INTEGER NOT NULL,
    "avatar" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "login_ip" TEXT,
    "login_date" TIMESTAMP(3),
    "creator" TEXT,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updater" TEXT,
    "update_time" TIMESTAMP(3) NOT NULL,
    "deleted" INTEGER NOT NULL DEFAULT 1,
    "tenant_id" INTEGER,

    CONSTRAINT "SystemUser_pkey" PRIMARY KEY ("id")
);
