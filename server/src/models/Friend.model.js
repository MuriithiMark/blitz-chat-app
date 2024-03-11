import prisma from "../prisma.js"

const create = async (newFriendShip) => {
    try {
        const friendShip = await prisma.friendShip.create({
            data: newFriendShip
        })
        return friendShip;
    } catch (error) {
        console.error(error)
        throw new Error("failed to create friendship")
    }
}

const getFriendShipByTheirIds = async (userId, friendId) => {
    try {
        const friendShip = await prisma.friendShip.findUnique({
            where: {
                userId: userId,
                friendId: friendId
            }
        })
        return friendShip;
    } catch (error) {
        console.error(error)
        throw new Error("no such friend ship")
    }
}

const FriendShipModel = {
    create,
    getFriendShipByTheirIds
}

export default FriendShipModel;