import { Router } from "express";
import GroupController from "../controllers/Group.controller.js";
import { checkSchema } from "express-validator";
import { newGroupSchema } from "../utils/validations/group_schema.js";
import validateSchema from "../middle-wares/validate-schema.js";

const groupRouter = Router();

groupRouter.get("/", GroupController.getAllGroups);
groupRouter.post("/", checkSchema(newGroupSchema), validateSchema, GroupController.createGroup);

groupRouter.get("/user", GroupController.getUserGroups);

groupRouter.get("/:groupId", GroupController.getGroupById);

groupRouter.post("/members/:groupId", GroupController.addGroupMember);
groupRouter.get("/members/:groupId", GroupController.getGroupMembers);

groupRouter.get("/messages/:groupId", GroupController.getGroupMessages);

export default groupRouter;