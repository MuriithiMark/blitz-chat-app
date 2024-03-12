import prisma from "../prisma.js"

const create = async (newFriendShip) => {
    try {
        const friendShip = await prisma.friendShip.create({
            data: newFriendShip
        })
        return friendShip;
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
            data: updateData
        })
        return friendShip
    } catch (error) {
        console.error(error)
        throw error
    }
}

const getFriendShipByTheirIds = async (userId, friendId) => {
    try {
        console.log(userId, friendId)
        if (userId === friendId) {

        }
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
            throw new Error("not found")
        }
        return friendShips[0];
    } catch (error) {
        console.error(error)
        throw error
    }
}

const FriendShipModel = {
    create,
    update,
    getFriendShipByTheirIds
}

export default FriendShipModel;