import UserModel from "../models/User.model.js";
import {
    comparePassword,
    generateToken,
    hashPassword,
    verifyToken as verifyJWT_Token
} from "../utils/auth.js";

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const registerUser = async (req, res, next) => {
    const data = req.data;
    try {
        const existingUserWithEmail = await UserModel.getUserByEmail(data.email);
        if (existingUserWithEmail) {
            return res.status(400).send({ status: "fail", message: "email already exists" })
        }
        
        const existingUserWithUsername = await UserModel.getUserByUsername(data.username);
        if (existingUserWithUsername) {
            return res.status(400).send({ status: "fail", message: "username already exists" })
        }


        data.hashedPassword = await hashPassword(data.password);
        delete data.password;
        await UserModel.create(data);
        res.status(201).send({ status: "success", message: "user created" })
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message }).end()
    }
}


/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const loginUser = async (req, res, next) => {
    const loginData = req.data;
    try {
        const foundUser = await UserModel.getUserByUsername(loginData.username);
        if (!foundUser) {
            return res.status(400).send({ status: "fail", message: "invalid login details" }).end();
        }

        const passwordMatches = await comparePassword(loginData.password, foundUser.hashedPassword);
        if (!passwordMatches) {
            return res.status(400).send({ status: "fail", message: "invalid login details" }).end()
        }

        const auth_token = await generateToken(foundUser);
        res.cookie("auth_token", auth_token, { expiresIn: 60 * 60 * 1000 });
        req.session.user = foundUser;
        console.log('Login: ', req.session.user)
        res.status(200).send({ status: "success", user: foundUser }).end()
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message }).end()
    }
}


/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("auth_token")
        // TODO use session.destroy, or save session
        req.session.user = null;
        res.status(200).send({ status: "success", message: "user logged out" }).end()
    } catch (error) {
        res.status(500).send({ status: "fail", message: "failed to logout user" }).end()
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const verifyToken = async (req, res) => {
    const auth_token = req.cookies.auth_token;
    if (!auth_token) {
        return res.status(401).send({ status: "fail", message: "no auth_token" }).end()
    }
    try {
        const user = await verifyJWT_Token(auth_token);
        res.status(200).send({ status: "success", user, token: auth_token }).end()
    } catch (error) {
        res.status(401).send({ status: "fail", message: error.message }).end()
    }
}

const AuthController = {
    registerUser,
    loginUser,
    logoutUser,
    verifyToken
}


export default AuthController;