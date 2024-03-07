import  dotenv from "dotenv";

import { app, io, server } from "./utils/init.cjs";
import authRouter from "./routes/auth-router.js";

dotenv.config()

const port = process.env.PORT ?? 3000;

app.use("auth", authRouter)

io.on("connection", (socket) => {
    console.info(`Sockets online`)
})

server.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`)
})