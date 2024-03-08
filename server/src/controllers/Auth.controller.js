import UserModel from "../models/User.model.js";
import { comparePassword, generateToken, hashPassword } from "../utils/auth.js";

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const registerUser = async (req, res, next) => {
    const data = req.data;
    const existingUserWithEmail = await UserModel.getUserByEmail(data.email);
    if (existingUserWithEmail) {
        return res.status(400).send({ status: "fail", message: "email already exists" })
    }
    const existingUserWithUsername = await UserModel.getUserByUsername(data.username);
    if (existingUserWithUsername) {
        return res.status(400).send({ status: "fail", message: "username already exists" })
    }

    try {
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
    const foundUser = await UserModel.getUserByUsername(loginData.username);
    if (!foundUser) {
        return res.status(400).send({ status: "fail", message: "invalid login details" }).end();
    }
    const passwordMatches = await comparePassword(loginData.password, foundUser.hashedPassword);
    if (!passwordMatches) {
        return res.status(400).send({ status: "fail", message: "invalid login details" }).end()
    }

    try {
        const auth_token = await generateToken(foundUser);
        res.cookie("auth_token", auth_token, { expires: 60 * 60 * 1000});
        req.session.user = foundUser;
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
    console.log(req.cookies)
    if(!auth_token) {
        return res.status(401).send({status: "fail", message: "no auth_token"}).end()
    }
    try {
        await verifyToken(auth_token);
        res.status(200).send({status:"success", message: "authorized"}).end()
    } catch (error) {
        res.status(401).send({status: "fail", message: error.message}).end()
    }
}

const AuthController = {
    registerUser,
    loginUser,
    logoutUser,
    verifyToken
}


export default AuthController;