import { Router} from "express";
import prisma from "../utils/prisma.js";

const authRouter = Router();

authRouter.get("/",async (req, res) => {
    const users = await prisma.users.findMany();
    res.send(users).end()
})


authRouter.post("/", async (req, res) => {
    await prisma.users.create({
        data: req.body
    })
})

export default authRouter