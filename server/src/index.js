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
import friendShipRouter from "./routes/friendship-router.js";
import userMessageRouter from "./routes/user-message.router.js";
import groupRouter from "./routes/group-router.js";
import SocketHandler from "./handlers/socket.handler.js";
import prisma from "./prisma.js";
import uploadRouter from "./routes/upload-router.js";


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
app.use(express.urlencoded({ extended: true }))
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
app.use("/public", express.static("public"))

app.use("/auth", authRouter);
app.use("/users", protectedRoute, usersRouter);
app.use("/friends", protectedRoute, friendShipRouter);
app.use("/users/messages", protectedRoute, userMessageRouter);
app.use("/groups", protectedRoute, groupRouter);
app.use(uploadRouter);
app.all("*", (req, res) => {
    res.status(404).send({ status: "fail", message: "not found" }).end()
})


io.engine.on("initial_headers", (headers) => {
    headers["Access-Control-Allow-Origin"] = "http://localhost:5173";
    headers["Access-Control-Allow-Credentials"] = true
})

io.engine.on("headers", (headers) => {
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Credentials"] = true
})


io.use((socket, next) => {
    const user = socket.handshake.auth.user;
    try {
        // verify token
        const token = socket.handshake.auth.token;
    } catch (error) {
        return next(new Error({ data: 'fail', message: 'invalid token' }))
    }
    if (!user) {
        return next(new Error({ data: 'fail', message: "invalid user" }))
    }
    // Join user to all groups, they already are int
    console.log('Socket for ', socket.username)
    socket.id = user.id;
    socket.user = user;

    prisma.groupMember.findMany({
        where: {
            memberId: user.id
        }
    })
        .then((memberShips) => {
            console.error({ memberShips })
            memberShips.forEach((memberShip) => socket.join(memberShip.groupId))
            return next()
        })
        .catch((error) => {
            console.error(error);
            return next(error)
        })
});



io.on("connection", SocketHandler);

server.listen(PORT, () => {
    console.info(`Server running at http://localhost:${PORT}`)
})