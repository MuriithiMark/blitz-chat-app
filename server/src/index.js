import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session"
import cors from "cors";
import dotenv from "dotenv";

import { app, io, server } from "./utils/init.js";
import authRouter from "./routes/auth-router.js";
import usersRouter from "./routes/users-router.js";
import protectedRoute from "./middle-wares/protected-route.js";
import headerModifier from "./middle-wares/header-modifier.js"
import FriendChatHandler from "./handlers/FriendChat.handler.js";
import GroupChatHandler from "./handlers/GroupChat.handler.js";
import NotificationHandler from "./handlers/Notification.handler.js";
import friendShipRouter from "./routes/friendship-router.js";
import userMessageRouter from "./routes/user-message.router.js";
import groupRouter from "./routes/group-router.js";


dotenv.config()

const PORT = process.env.PORT ?? 3000;
const SECRET_KEY = process.env.SECRET_KEY ?? "super-secret";
const CORS_OPTIONS = {
    credentials: true,
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"]
}

app.use(cors(CORS_OPTIONS));
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        // domain: "http://localhost:5173"
    }
}))
app.use(headerModifier)

app.use("/auth", authRouter);
app.use("/users", protectedRoute, usersRouter);
app.use("/friends", protectedRoute, friendShipRouter);
app.use("/users/messages", protectedRoute, userMessageRouter);
app.use("/groups", protectedRoute, groupRouter);
app.all("*", (req, res, next) => {
    res.status(404).send({status: "fail", message: "not found"}).end()
})

const friendChatServer = io.of("/friend")
const groupChatServer = io.of("/group")
const notificationServer = io.of("/notification");

io.engine.on("initial_headers", (headers, req) => {
    headers["Access-Control-Allow-Origin"] = "http://localhost:5173";
    headers["Access-Control-Allow-Credentials"] = true
})

io.engine.on("headers", (headers, req) => {
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Credentials"] = true
})

io.on("connection", async (socket) => {

})

friendChatServer.use((socket, next) => {
    const user = socket.handshake.auth.user;
    if (!user) {
        return next(new Error("invalid user"))
    }
    socket.id = user.id;
    socket.user = user;
    next()
})

friendChatServer.on("connection", FriendChatHandler);

// Group Chat Server
groupChatServer.use((socket, next) => {
    const group = socket.handshake.auth.group;
    if (!group) {
        return next(new Error("invalid group"))
    }
    socket.id = group.id;
    socket.group = group
    next()
});

groupChatServer.on("connection", GroupChatHandler)

notificationServer.on("connection", NotificationHandler)


server.listen(PORT, () => {
    console.info(`Server running at http://localhost:${PORT}`)
})