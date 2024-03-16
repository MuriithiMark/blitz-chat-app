import prisma from "../prisma.js"

const create = async (newFriendShip) => {
    try {
        const friendShip = await prisma.friendShip.create({
            data: newFriendShip,
            include: {
                to: true
            }
        })
        return {
            ...friendShip.to,
            friendShipId: friendShip.id,
            fromId: friendShip.userId,
            toId: friendShip.friendId
        };
    } catch (error) {
        console.error(error)
        throw error
    }
}

const update = async (friendShipId, updateData) => {
    try {
        const friendShip = await prisma.friendShip.update({
            where: {
                id: friendShipId
            },
            data: updateData,
            include: {
                to: true,
                from: true
            }
        });
        return friendShip
    } catch (error) {
        console.error(error)
        throw error
    }
}

const getFriendShipByTheirIds = async (userId, friendId) => {
    try {
        const friendShips = await prisma.friendShip.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            { userId: userId },
                            { friendId: friendId }
                        ],
                    },
                    {
                        AND: [
                            { userId: friendId },
                            { friendId: userId }
                        ]
                    }
                ]
            }
        })
        if (friendShips.length === 0) {
            return null;
        }
        return friendShips[0];
    } catch (error) {
        console.error(error)
        throw error
    }
}

const getUserFriendsByUserId = async (userId) => {
    try {
        const friendShips = await prisma.friendShip.findMany({
            where: {
                OR: [
                    { userId: userId },
                    { friendId: userId }
                ]
            },
            include: {
                to: true,
                from: true
            }
        });
        const friends = friendShips.map((friendShip) => (friendShip.userId === userId) ? ({
            ...friendShip.to,
            friendShipId: friendShip.id,
            fromId: friendShip.userId,
            toId: friendShip.friendId,
        })
            :
            ({
                ...friendShip.from,
                friendShipId: friendShip.id,
                fromId: friendShip.userId,
                toId: friendShip.friendId
            })
        )
        return friends
    } catch (error) {
        console.error(error)
        throw error
    }
}

const getMessagesByFriendShipId = async (friendShipId) => {
    try {
        const friendShip = await prisma.friendShip.findUnique({
            where: {
                id: friendShipId
            },
            include: {
                messages: true
            }
        })
        if (!friendShip) {
            throw new Error("no such friendship");
        }
        return friendShip.messages;
    } catch (error) {
        console.error(error)
        throw error
    }
}

const FriendShipModel = {
    create,
    update,
    getUserFriendsByUserId,
    getFriendShipByTheirIds,
    getMessagesByFriendShipId
}

export default FriendShipModel;