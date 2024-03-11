import { Socket } from "socket.io";
import UserMessageModel from "../models/UserMessage.model.js";

const onReceiveMessage = async (socket, message) => {

}


const onSendMessage = async () => { }

const onSendingMessage = async () => { }

const onDeleteMessage = async () => { }

/**
 * @param {Socket} socket 
 */
const FriendChatHandler = async (socket) => {
    console.log('Chat Socket Connected')
    socket.on("new", async ({ to, newMessage }) => {
        newMessage.senderId = socket.user.id;
        newMessage.recipientId = to;
        try {
            const message = await UserMessageModel.create(newMessage);
            socket.to(to).emit("new", {
                from: socket.user.id,
                data: { status: "success", message }
            })
        } catch (error) {
            socket.to(to).emit("new", {
                from: socket.user.id,
                data: { status: "fail", message: error.message }
            })
        }
    })

    socket.on("delete", async ({ to, messageId }) => {
        try {
            const message = await UserMessageModel.deleteMessage(messageId);
            socket.to(to).emit("delete", {
                from: socket.user.id,
                data: { status: "success", id: message.id }
            })
        } catch (error) {
            socket.to(to).emit("delete", {
                from: socket.user.id,
                data: { status: "fail", message: error.message }
            })
        }
    })

    socket.on("typing", async ({ to }) => {
        socket.to(to).emit("typing", {
            from: socket.user.id,
            data: { status: "success", message: "typing" }
        })
    })
}

export default FriendChatHandler