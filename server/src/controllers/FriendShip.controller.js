import FriendShipModel from "../models/Friend.model.js";

/**
 * @type { import("../type-definitions.d").ExpressFunction}
 */
const postFriendRequest = async (req, res, next) => {
    try {
        const friendId = req.params.friendId;
        const userId = req.params.user.id
        const existingFriendShip = await FriendShipModel.getFriendShipByTheirIds(userId, friendId);
        if (existingFriendShip) {
            return res.status(400).send({ status: "fail", message: "friendship already exists" }).end()
        }
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
        const friendShipId  = req.params.friendShipId;
        if (!friendShipId) {
            return res.status(400).send({ status: "fail", message: "invalid friend id" }).end()
        }
        const friendShip = await FriendShipModel.update(friendShipId, { hasAccepted: true, isDeclined: false})
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message }).end();
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const declineFriendRequest = async (req, res, next) => {
    try {
        const friendShipId  = req.params.friendShipId;
        if (!friendShipId) {
            return res.status(400).send({ status: "fail", message: "invalid friend id" }).end()
        }
        const friendShip = await FriendShipModel.update(friendShipId, { hasAccepted: false, isDeclined: true})
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message }).end();
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const getFriendShipById = async (req, res, next) => {
    console.log('Get Friend ship by id ', req.params.friendId)
    try {
        const friendId = req.params.friendId;
        const userId = req.session.user.id;
        if (!friendId) {
            return res.status(400).send({ status: "fail", message: "invalid friend id" }).end()
        }
        const friendShip = await FriendShipModel.getFriendShipByTheirIds(userId, friendId);
        res.status(200).send({ status: "success", friendShip }).end()
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message }).end();
    }
}

const FriendShipController = {
    postFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    getFriendShipById
}

export default FriendShipController;