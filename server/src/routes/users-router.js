import { Router } from "express";

import UserController from "../controllers/User.controller.js";
import protectedRoute from "../middle-wares/protected-route.js";

const usersRouter = Router();

usersRouter.get("/", UserController.getAllUsers)

usersRouter.get("/:userId", UserController.getUserById)

export default usersRouter