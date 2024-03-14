import GroupModel from "../models/Group.model.js"

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const createGroup = async (req, res) => {
    const data = req.data;
    try {
        const group = await GroupModel.create(data)
        res.status(200).send({ status: 'fail', group }).end()
    } catch (error) {
        res.status(500).send({ status: 'fail', message: error.message }).end()
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const getAllGroups = async (req, res) => {
    try {
        const groups = await GroupModel.getAllGroups();
        res.status(200).send({ status: 'success', groups }).end()
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'fail', message: error.message }).end();
    }
}

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const getGroupById = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        if (!groupId) {
            return res.status(400).send({ status: 'fail', message: 'invalid group id' }).end()
        }
        const group = await GroupModel.getGroupById(groupId);
        res.status(200).send({ status: 'success', group }).end()
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'fail', message: error.message }).end()
    }
}

const GroupController = {
    createGroup,
    getGroupById,
    getAllGroups
}

export default GroupController;