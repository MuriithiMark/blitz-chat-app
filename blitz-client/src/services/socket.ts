import { io } from "socket.io-client";
import { SERVER_URL } from "../utils/constants";

const socket = io(SERVER_URL, { autoConnect: false })

socket.onAny((event, ...args) => {
    console.log(event, args)
})

socket.on("connection", () => {
    console.log('Socket connected');
})

socket.on("disconnect", () => {
    console.log('Socket disconnected')
})

export default socket;