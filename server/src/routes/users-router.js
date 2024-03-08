import { Router } from "express";
import UserController from "../controllers/User.controller";

const usersRouter = Router();

usersRouter.get("/", UserController.getAllUsers)

usersRouter.get("/:userId", UserController.getUserById)