import UserMessageModel from "../models/UserMessage.model.js";

/**
 * @type { import("../type-definitions.d").ExpressFunction}
 */
const getMessagesByFriendShip = async (req, res) => {
    try {
        const friendShipId = req.params.friendShipId;
        if(!friendShipId) {
            return res.status(400).send({status: 'fail', message: 'no such friendship'}).end()
        }
        const messages = await UserMessageModel.getMessagesByFriendShip(friendShipId);
        res.status(200).send({status: 'success', messages}).end()
    } catch (error) {
        res.status(500).send({status: 'fail', message: error.message}).end()
    }
}

const UserMessageController = {
    getMessagesByFriendShip,
}

export default UserMessageController