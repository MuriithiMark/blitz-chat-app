import { Router } from "express";
import GroupController from "../controllers/Group.controller.js";

const groupRouter = Router();

groupRouter.post("/new", GroupController.createGroup);
groupRouter.get("/", GroupController.getAllGroups);
groupRouter.get("/:groupId", GroupController.getGroupById);

export default groupRouter;