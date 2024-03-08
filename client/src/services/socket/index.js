import { io } from "socket.io-client";

import { SERVER_URL } from "../../utils/constants";

const socket = io(SERVER_URL)

socket.io.on("error", (error) => {
    console.error(`[Socket Error] `, error);
    // dispatch action to notify of errors
    return;
})

export default socket;