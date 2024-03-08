import UserModel from "../models/User.model.js"

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.getAllUsers();
        res.status(200).send({status: "success", users}).end()
    } catch (error) {
        res.status(500).send({status: "fail", message: error.message}).end();
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const getUserById = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await UserModel.getUserById(userId);
        if (!user) {
            return res.status(404).send({ status: "fail", message: "user not found" });
        }
        res.status(200).send({ status: "success", user })
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message }).end()
    }
}


const UserController = {
    getAllUsers,
    getUserById
}

export default UserController