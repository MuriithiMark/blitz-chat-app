import prisma from "../prisma.js"

const create = async (newMessage) => {
    try {
        const message = await prisma.userMessage.create({
            data: newMessage
        })
        return message
    } catch (error) {
        console.error(`[UserMessageModel.create] `, error);
        throw new Error("failed to create message")
    }
}

const edit = async (updatedMessage) => {
    try {
        const message = await prisma.user.update({
            where: { id: updatedMessage.id },
            data: updatedMessage
        })
        return message;
    } catch (error) {
        console.error(`[UserMessageModel.edit] `, error);
        throw new Error("failed to edit message")
    }
}

const getMessageById = async (messageId) => {
    try {
        const message = await prisma.userMessage.findUnique({
            where: {
                id: messageId
            }
        })
        return message
    } catch (error) {
        console.error(`[UserMessageMode.getMessageById] `, error);
        throw new Error("failed to get message by id")
    }
}

const getMessagesByFriendShip = async (friendShipId) => {
    try {
        // TODO add a rate limit, first retrieve last few messages
        const messages = await prisma.userMessage.findMany({
            where: {
                friendShipId: friendShipId
            },
            orderBy: [
                { createdAt: "asc" }
            ]
        })
        return messages;
    } catch (error) {
        console.error(`[UserMessageModel.getMessagesBetweenFriends] `, error);
        throw new Error(`failed to fetch messages for ${friendId}`)
    }
}

const deleteMessage = async (messageId) => {
    try {
        const message = await prisma.userMessage.delete({
            where: {
                id: messageId
            }
        })
        return message
    } catch (error) {
        console.error(`[UserMessageModel.deleteMessage] `, error);
        throw new Error(`failed to delete message`)
    }
}


const UserMessageModel = {
    create,
    edit,
    getMessageById,
    getMessagesByFriendShip,
    deleteMessage,
}

export default UserMessageModel;