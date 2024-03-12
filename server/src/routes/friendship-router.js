import { Router } from "express";
import FriendShipController from "../controllers/FriendShip.controller.js";

const friendShipRouter = Router()

friendShipRouter.post("/:friendId", FriendShipController.postFriendRequest);
friendShipRouter.get("/:friendId", FriendShipController.getFriendShipById)
friendShipRouter.get("/accept/:friendShipId", FriendShipController.acceptFriendRequest);
friendShipRouter.get("/decline/:friendShipId", FriendShipController.declineFriendRequest);

export default friendShipRouter;