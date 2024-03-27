/*
  Warnings:

  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GroupMember` ADD COLUMN `permissions` VARCHAR(191) NOT NULL DEFAULT 'normal';

-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `from` VARCHAR(191) NULL,
    ADD COLUMN `groupId` VARCHAR(191) NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
