import { io } from "socket.io-client";

import { SERVER_URL } from "../../utils/constants";

const socket = io(SERVER_URL)

const chatSocket = io(`${SERVER_URL}/friend`);
const groupSocket = io(`${SERVER_URL}/group`);
const notificationSocket = io(`${SERVER_URL}/notification`)

socket.io.on("error", (error) => {
    // console.error(`[Socket Error] `, error);
    // dispatch action to notify of errors
    return;
})

export {
    socket,
    chatSocket,
    groupSocket,
    notificationSocket
};