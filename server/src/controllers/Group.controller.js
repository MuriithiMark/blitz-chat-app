import GroupModel from "../models/Group.model.js"
import prisma from "../prisma.js";

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const createGroup = async (req, res) => {
    const data = req.body;
    try {
        const groupData = {
            ...data,
            members: {
                create: {
                    memberId: req.session.user.id
                }
            }
        }
        console.log({ groupData })
        const group = await GroupModel.create(groupData)
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

/**@type {import("../type-definitions.d").ExpressFunction} */
const getUserGroups = async (req, res, next) => {
    try {
        const userId = req.session.user.id;
        const groups = await prisma.groupMember.findMany({
            where: {
                memberId: userId,
            },
            include: {
                group: {
                    include: {
                        messages: {
                            include: {
                                from: true,
                            }
                        }
                    }
                }
            }
        })
        const userGroups = groups.map((group) => group.group);
        res.send({ status: 'success', groups: userGroups }).end()
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: 'fail', message: error.message }).end()
    }
}

/** @type {import("../type-definitions.d").ExpressFunction} */
const addGroupMember = async (req, res, next) => {
    try {

        const groupId = req.params.groupId;
        const memberId = req.body.memberId;

        if (!groupId) {
            return res.status(400).send({ status: 'fail', message: 'invalid group id' });
        }

        if (!memberId) {
            return res.status(400).send({ status: 'fail', message: 'no new member id provided' });
        }

        const existingMember = await prisma.user.findUnique({
            where: { id: memberId }
        })
        if (!existingMember) {
            return res.status(400).send({ status: 'fail', message: 'member with given id does not exist' }).end()
        }
        const group = await prisma.groupMember.create({
            data: {
                role: "user",
                group: {
                    connect: {
                        id: groupId
                    }
                },
                member: {
                    connect: {
                        id: memberId
                    }
                }
            },
            include: {
                group: true,
                member: true
            }
        })
        res.send({ status: 'success', group }).end()
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: 'fail', message: error.message }).end()
    }
}


const getGroupMembers = async (req, res, next) => {
    try {
        const groupId = req.params.groupId;

        if (!groupId) {
            return res.status(400).send({ status: 'fail', message: 'invalid group id' });
        }

        const group = await prisma.group.findUnique({
            where: {
                id: groupId
            },
            include: {
                members: true
            }
        })
        res.send({ status: 'success', group }).end()
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: 'fail', message: error.message }).end()
    }
}

const getGroupMessages = async (req, res, next) => {
    try {
        const groupId = req.params.groupId;

        if (!groupId) {
            return res.status(400).send({ status: 'fail', message: 'invalid group id' });
        }
        const group = await prisma.group.findUnique({
            where: {
                id: groupId
            },
            include: {
                messages: true
            }
        })
        res.send({ status: 'success', group }).end()
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: 'fail', message: error.message }).end()
    }
}

const GroupController = {
    createGroup,
    getGroupById,
    getAllGroups,
    getUserGroups,
    addGroupMember,
    getGroupMembers,
    getGroupMessages
}

export default GroupController;