import { Router }  from "express";
import UserMessageController from "../controllers/UserMessage.controller.js";

const userMessageRouter = Router()

userMessageRouter.get("/:friendShipId", UserMessageController.getMessagesByFriendShip)

export default userMessageRouter