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

    socket.on("disconnect", () => {
        console.log('User ', socket.user.username, ' disconnected')
    });

    socket.on("new", async ({ to, friendShipId, newMessage }) => {
        const messageData = {
            ...newMessage,
            senderId: socket.user.id,
            recipientId: to,
            friendShip: {
                connect: {
                    id: friendShipId
                }
            }
        }
        try {
            const message = await UserMessageModel.create(messageData);
            // Send to both that a new message was created
            // TODO Preferrably check that friend is online, if not online send notification instead
            socket.to(to).emit("new", {
                from: socket.user.id,
                data: { status: "success", message }
            });
            socket.emit("new/created", {
                data: { status: 'success', message }
            })
        } catch (error) {
            socket.emit("new/error", {
                data: { status: 'fail', message: error.message }
            });
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