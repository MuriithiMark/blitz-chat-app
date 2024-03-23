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

    socket.on("/groups/messages/new", (data) => {
        console.log({ groupMessage: data })
        try {
            const { newMessage } = data;
            const message = prisma.groupMessage.create({
                data: newMessage
            })
            const responseData = {
                status: 'success',
                message
            }
            // Emit only to room
        } catch (error) {
            console.error(error);
        }
    })
}

export default SocketHandler;