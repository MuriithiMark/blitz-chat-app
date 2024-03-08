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