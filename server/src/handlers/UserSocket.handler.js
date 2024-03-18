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
const UserSocketHandler = async (socket) => {
    console.log('User ', socket.user.username, ' Connected')

    socket.on("disconnect", () => {
        console.log('User ', socket.user.username, ' disconnected')
    });

    socket.on("/messages/new", async ({ to, contextId, newMessage }) => {
        // console.log('Matches ', socket.id === newMessage.)
        const messageData = {
            ...newMessage,
            senderId: socket.user.id,
            recipientId: to,
            friendShip: {
                connect: {
                    id: contextId
                }
            }
        }
        console.log('New Message received: ', messageData);
        try {
            const message = await UserMessageModel.create(messageData);
            console.log('New Message: ', message);
            // Send to both that a new message was created
            // TODO Preferrably check that friend is online, if not online send notification instead
            socket.to(to).emit("/messages/new", {
                from: socket.user.id,
                data: { status: "success", message }
            });
            socket.emit("/messages/new", {
                data: { status: 'success', message }
            })
        } catch (error) {
            socket.emit("/messages/error", {
                data: { status: 'fail', message: error.message }
            });
        }
    })

    socket.on("/messages/delete", async ({ to, messageId }) => {
        try {
            const message = await UserMessageModel.deleteMessage(messageId);
            socket.to(to).emit("/messages/delete", {
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

    socket.on("/messages/typing", async ({ to }) => {
        socket.to(to).emit("typing", {
            from: socket.user.id,
            data: { status: "success", message: "typing" }
        })
    })
}

export default UserSocketHandler;