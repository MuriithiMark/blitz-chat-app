import { Socket } from "socket.io";
import prisma from "../prisma.js";

/**
 * @param {Socket} socket
 */
const SocketHandler = async (socket) => {
    console.log('User ', socket.user.username, ' connected!')

    socket.on("disconnect", () => {
        console.log('User ', socket.user.username, ' disconnected')
    });

    socket.on("/friends/messages/new", async (data) => {
        try {
            const { newMessage } = data;
            const message = await prisma.userMessage.create({
                data: newMessage
            })
            const responseData = {
                status: 'success',
                message
            }
            socket.to(data.to).emit("/friends/messages/new", responseData);
            socket.emit("/friends/messages/new", responseData);
        } catch (error) {
            console.error(`[UserMessageModel.create] `, error);
        }
    })

    socket.on("/groups/messages/new", async (data) => {
        try {
            const { newMessage } = data;
            const message = await prisma.groupMessage.create({
                data: newMessage,
                include: {
                    from: true
                }
            })
            const responseData = {
                status: 'success',
                message
            }

     
            // Emit only to room
            socket.to(message.groupId).emit("/groups/messages/new", responseData);
            socket.emit("/groups/messages/new", responseData);

            // Send notifications
            const notificationData = {
                type: 'group-message',
                groupId: message.groupId,
                from: message.from.username,
                alertLevel: 'info',
                title: "New Message",
                content: message.content,
                user: {
                    connect: {
                        id: socket
                    }
                }
            }

            const notification = await prisma.notification.create({
                data: notificationData
            })
            socket.to(message.groupId).emit("/notifications/new", notification)

        } catch (error) {
            console.error(`[GroupMessageModel.create] `, error);
        }
    })
}

export default SocketHandler;