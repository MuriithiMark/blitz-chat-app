import { Router } from "express";
import FriendShipController from "../controllers/FriendShip.controller.js";

const friendShipRouter = Router()

friendShipRouter.get("/", FriendShipController.getUserFriends);
friendShipRouter.post("/:friendId/new", FriendShipController.postFriendRequest);
friendShipRouter.get("/:friendId", FriendShipController.getFriendShipById)
friendShipRouter.get("/:friendShipId/accept", FriendShipController.acceptFriendRequest);
friendShipRouter.get("/:friendShipId/decline", FriendShipController.declineFriendRequest);
friendShipRouter.get("/:friendShipId/messages", FriendShipController.getMessagesByFriendShipId)

export default friendShipRouter;