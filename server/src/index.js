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

dotenv.config()

const PORT = process.env.PORT ?? 3000;
const SECRET_KEY = process.env.SECRET_KEY ?? "super-secret";
const CORS_OPTIONS = {
    origin: "*",
    methods: "GET,POST,PUT,DELETE"
}

app.use(cors(CORS_OPTIONS));
app.use(express.json())
app.use(cookieParser())
app.use(session({ secret: SECRET_KEY }))
app.use(headerModifier)

app.use("/auth", authRouter)
app.use("/users", protectedRoute, usersRouter)

io.engine.on("initial_headers", (headers, req) => {
    headers["Access-Control-Allow-Origin"] = "*";
})

io.engine.on("headers", (headers, req) => {
    headers["Access-Control-Allow-Origin"] = "*";
})

io.on("connection", (socket) => {
    socket.on("hello", (data) => {
        console.log(`Received Data: `, data);
    })
})

server.listen(PORT, () => {
    console.info(`Server running at http://localhost:${PORT}`)
})