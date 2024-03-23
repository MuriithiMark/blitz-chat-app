-- AlterTable
ALTER TABLE `Group` ADD COLUMN `avatarUrl` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `GroupMessage` ADD CONSTRAINT `GroupMessage_fromId_fkey` FOREIGN KEY (`fromId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
