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
    console.log('Friends Connected!')

    socket.on("new", async (friendShipId, newMessage) => {
        try {
            const message = await UserMessageModel.create(newMessage);
            socket.emit("notify-friend__new-message", friendShipId, { status: "success", message });
        } catch (error) {
            socket.emit("notify-friend__new", friendShipId, { status: "fail", message: error.message })
        }
    })

    socket.on("delete", async (friendShipId, messageId) => {
        try {
            const message = await UserMessageModel.deleteMessage(messageId);
            socket.emit("notify-friend__delete", friendShipId, { status: "success", message: "message deleted" })
        } catch (error) {
            socket.emit("notify-friend__delete", friendShipId, { status: "fail", message: error.message })
        }
    })

    socket.on("typing", async (friendShipId, friendId) => {
        socket.emit("notify-friend__typing", friendShipId, friendId)
    })




}

export default FriendChatHandler