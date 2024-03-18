import { Router } from "express";
import FriendShipController from "../controllers/FriendShip.controller.js";

const friendShipRouter = Router()

friendShipRouter.get("/", FriendShipController.getUserFriends);
friendShipRouter.get("/:friendShipId", FriendShipController.getFriendShipById)
friendShipRouter.get("/users/:friendId", FriendShipController.getFriendShipByFriendId)
friendShipRouter.post("/new/:friendId", FriendShipController.postFriendRequest);
friendShipRouter.get("/accept/:friendShipId", FriendShipController.acceptFriendRequest);
friendShipRouter.get("/decline/:friendShipId", FriendShipController.declineFriendRequest);
friendShipRouter.get("/messages/:friendShipId", FriendShipController.getMessagesByFriendShipId)

export default friendShipRouter;