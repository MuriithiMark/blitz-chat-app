-- DropForeignKey
ALTER TABLE `FriendShip` DROP FOREIGN KEY `FriendShip_friendId_fkey`;

-- DropForeignKey
ALTER TABLE `FriendShip` DROP FOREIGN KEY `FriendShip_userId_fkey`;

-- AlterTable
ALTER TABLE `FriendShip` MODIFY `acceptedOn` DATETIME(3) NULL;
