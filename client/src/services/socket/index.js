import { io } from "socket.io-client";

import { SERVER_URL } from "../../utils/constants.js";

const socket = io(SERVER_URL)

const userSocket = io(`${SERVER_URL}/users`, { autoConnect: false });
const groupSocket = io(`${SERVER_URL}/groups`, { autoConnect: false });
const notificationSocket = io(`${SERVER_URL}/notifications`, { autoConnect: true })

socket.on("error", (error) => {
    console.error(`[Socket Error] `, error);
    return;
})

userSocket.onAny((event, ...args) => {
    console.log(event, args)
})

groupSocket.onAny((event, ...args) => {
    console.log(event, args)
})

notificationSocket.onAny((event, ...args) => {
    console.log(event, args)
})

userSocket.on("connect", () => {
    console.log('Client connected ')
})

userSocket.on("disconnect", () => {
    console.log('Client disconnected')
})

export {
    socket,
    userSocket,
    groupSocket,
    notificationSocket
};