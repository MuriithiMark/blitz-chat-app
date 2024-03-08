import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session"
import dotenv from "dotenv";

import { app, io, server } from "./utils/init.cjs";
import authRouter from "./routes/auth-router.js";
import usersRouter from "./routes/users-router.js";
import protectedRoute from "./middle-wares/protected-route.js";

dotenv.config()

const PORT = process.env.PORT ?? 3000;
const SECRET_KEY = process.env.SECRET_KEY ?? "super-secret";

app.use(express.json())
app.use(cookieParser())
app.use(session({ secret: SECRET_KEY }))


app.use("/auth", authRouter)
app.use("/users", protectedRoute, usersRouter)

io.on("connection", (socket) => {
    console.info(`Sockets online`)
})

server.listen(PORT, () => {
    console.info(`Server running at http://localhost:${PORT}`)
})