import FriendShipModel from "../models/Friend.model.js";

/**
 * @type { import("../type-definitions.d").ExpressFunction}
 */
const postFriendRequest = async (req, res, next) => {
    try {
        const friendId = req.params.friendId;
        if (!friendId) {
            return res.status(400).send({ status: "fail", message: "invalid friend id" }).end()
        }
        console.log(`req.session.user `, req.session.user);
        console.log(`frienId `, friendId);
        const newFriendShip = {
            userId: req.session.user.id,
            friendId: friendId,
        }
        const friendShip = await FriendShipModel.create(newFriendShip);
        res.status(201).send({ status: "success", friendShip }).end()
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message }).end();
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const acceptFriendRequest = async (req, res, next) => {
    try {

    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message }).end();
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const refuseFriendRequest = async (req, res, next) => {
    try {

    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message }).end();
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const getFriendShipById = async (req, res, next) => {
    try {
        const friendId = req.params.friendId;
        if(!friendId) {
            return res.status(400).send({status: "fail", message: "invalid friend id"}).end()
        }
        const userId = req.session.user.id;
        const friendShip = await FriendShipModel.getFriendShipByTheirIds(userId, friendId);
        res.status(200).send({status: "success", friendShip}).end()
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message }).end();
    }
}

const FriendShipController = {
    postFriendRequest,
    acceptFriendRequest,
    refuseFriendRequest,
    getFriendShipById
}

export default FriendShipController;