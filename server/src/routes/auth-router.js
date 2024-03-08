import { Router} from "express";
import prisma from "../utils/prisma.js";
import AuthController from "../controllers/Auth.controller.js";

const authRouter = Router();

authRouter.get("/register", AuthController.registerUser)

authRouter.post("/login", AuthController.loginUser)

authRouter.get("/logout", AuthController.logoutUser)


export default authRouter