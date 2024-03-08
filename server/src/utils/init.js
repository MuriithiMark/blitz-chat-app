// const app = require("express")();
// const server = require("http").createServer(app);
// const options = {
//     // Websocket options
// }
// const io = require("socket.io")(server, options);

// io.on("connection", (socket) => {
//     console.log('Socket connected!')
// })

// // module.exports = {
// //     app,
// //     io,
// //     server
// // }

// server.listen(5000)

import express from "express";
import * as http from "http";
import { Server } from "socket.io";

const SOCKET_OPTIONS = {

}

const app = express()

const server = http.createServer(app)

const io = new Server(server, SOCKET_OPTIONS)

export {
    app,
    io,
    server
}