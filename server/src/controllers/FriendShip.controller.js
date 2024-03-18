import FriendShipModel from "../models/Friend.model.js";

/**
 * @type { import("../type-definitions.d").ExpressFunction}
 */
const postFriendRequest = async (req, res, next) => {
    console.log('Posting new Friend Request')
    try {
        const friendId = req.params.friendId;
        const userId = req.session.user.id

        if (!friendId) {
            return res.status(400).send({ status: "fail", message: "invalid friend id" }).end()
        }

        const existingFriendShip = await FriendShipModel.getFriendShipByTheirIds(userId, friendId);
        if (existingFriendShip) {
            return res.status(400).send({ status: "fail", message: "friendship already exists" }).end()
        }

        const newFriendShip = { userId, friendId }
        const friendShip = await FriendShipModel.create(newFriendShip);
        const friend = {
            ...friendShip.to,
            friendShipId: friendShip.id,
            fromId: friendShip.userId,
            toId: friendShip.friendId
        }
        res.status(201).send({ status: "success", friend }).end()
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: "fail", message: error.message }).end();
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const acceptFriendRequest = async (req, res, next) => {
    try {
        const friendShipId = req.params.friendShipId;
        if (!friendShipId) {
            return res.status(400).send({ status: "fail", message: "invalid friend id" }).end()
        }
        const friendShip = await FriendShipModel.update(friendShipId, { hasAccepted: true, isDeclined: false });
        const friend = {
            ...friendShip.from,
            friendShipId,
            fromId: friendShip.userId,
            toId: friendShip.friendId
        }
        res.status(200).send({ status: 'success', friend }).end()
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message }).end();
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const declineFriendRequest = async (req, res, next) => {
    try {
        const friendShipId = req.params.friendShipId;
        if (!friendShipId) {
            return res.status(400).send({ status: "fail", message: "invalid friend id" }).end()
        }
        const friendShip = await FriendShipModel.update(friendShipId, { hasAccepted: false, isDeclined: true })
        const friend = {
            ...friendShip.from,
            friendShipId,
            fromId: friendShip.userId,
            toId: friendShip.friendId
        }
        res.status(200).send({ status: 'success', friend }).end()
    } catch (error) {
        res.status(500).send({ status: "fail", message: error.message }).end();
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const getUserFriends = async (req, res, next) => {
    try {
        const userId = req.session.user.id;
        const friends = await FriendShipModel.getUserFriendsByUserId(userId);
        res.status(200).send({ status: 'success', friends }).end();
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'fail', message: error.message }).end()
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const getFriendShipById = async (req, res, next) => {
    try {
        const friendShipId = req.params.friendShipId;
        const userId = req.session.user.id;
        const friendShip = await FriendShipModel.getFriendShipById(friendShipId);
        if (!friendShip) {
            return res.status(404).send({ status: 'fail', message: 'friendship not found' }).end()
        }
        friendShip.fromId == friendShip.userId;
        friendShip.toId = friendShip.friendId;
        if (friendShip.userId === userId) {
            friendShip.friend = friendShip.to
        } else if (friendShip.friendId === userId) {
            friendShip.friend = friendShip.from;
        }
        delete friendShip.from;
        delete friendShip.to
        res.status(200).send({ status: 'success', friendShip }).end()
    } catch (error) {

        console.error(error);
        res.status(500).send({ status: 'fail', message: error.message }).end()
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const getFriendShipByFriendId = async (req, res, next) => {
    try {
        const friendId = req.params.friendId;
        const userId = req.session.user.id;
        if (!friendId) {
            return res.status(400).send({ status: "fail", message: "invalid friend id" }).end()
        }
        const friendShip = await FriendShipModel.getFriendShipByTheirIds(userId, friendId);
        if (!friendShip) {
            return res.status(404).send({ status: 'fail', message: 'friendship not found' }).end()
        }
        const friend = (friendShip.userId === userId) ?
            ({
                ...friendShip.to,
                friendShipId: friendShip.id,
                fromId: friendShip.userId,
                toId: friendShip.friendId,
            })
            :
            ({
                ...friendShip.from,
                friendShipId: friendShip.id,
                fromId: friendShip.userId,
                toId: friendShip.friendId
            })
        console.log('FriendShip ', friend)
        res.status(200).send({ status: "success", friend }).end()
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: "fail", message: error.message }).end();
    }
}

// const getFriendByFriendId = async (req, res, next) => {}

/**
 * @type { import("../type-definitions.d").ExpressFunction}
 */
const getMessagesByFriendShipId = async (req, res, next) => {
    try {
        const friendShipId = req.params.friendShipId;
        console.log('Messages By FriendShipID ', friendShipId)
        if (!friendShipId) {
            return res.status(400).send({ status: "fail", message: "no friendship id provided" }).end()
        }
        const messages = await FriendShipModel.getMessagesByFriendShipId(friendShipId);
        res.status(200).send({ status: "success", messages }).end()
    } catch (error) {
        console.error(error)
        if (error.message === "no such friendship") {
            return res.status(404).send({ status: 'fail', message: error.message }).end()
        }
        res.status(500).send({ status: 'fail', message: error.message }).end()
    }
}

const FriendShipController = {
    postFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    getFriendShipById,
    getUserFriends,
    getMessagesByFriendShipId,
    getFriendShipByFriendId
}

export default FriendShipController;