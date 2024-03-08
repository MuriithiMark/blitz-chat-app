import { Router} from "express";
import { checkSchema } from "express-validator";

import AuthController from "../controllers/Auth.controller.js";
import { loginSchema, registerSchema } from "../utils/validations/auth_schema.js";
import validateSchema from "../middle-wares/validate-schema.js";

const authRouter = Router();

authRouter.post("/register", checkSchema(registerSchema), validateSchema, AuthController.registerUser)

authRouter.post("/login", checkSchema(loginSchema), validateSchema, AuthController.loginUser)

authRouter.get("/logout", AuthController.logoutUser)

authRouter.get("/verify-token", AuthController.verifyToken)


export default authRouter