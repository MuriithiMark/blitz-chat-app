import GroupModel from "../models/Group.model.js"
import prisma from "../prisma.js";

/**
 * @type {import("../type-definitions.d").ExpressFunction}
 */
const createGroup = async (req, res) => {
    const data = req.data;
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
        res.status(200).send({ status: 'success', group }).end()
    } catch (error) {
        if (error.message === 'group already exists') {
            return res.status(400).send({ status: 'fail', message: 'group already exists' }).end()
        }
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
                        members: {
                            include: {
                                member: true,
                            },
                        },
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
const addGroupMember = async (req, res) => {
    try {

        const groupId = req.params.groupId;
        /**@type {string[]} */
        const members = req.body.members;

        if (!groupId) {
            return res.status(400).send({ status: 'fail', message: 'invalid group id' });
        }

        if (!members.length) {
            return res.status(400).send({ status: 'fail', message: 'no members id provided' });
        }

        const data = members.map((memberId) => (
            {
                groupId,
                memberId,
            }
        ))

        await prisma.groupMember.createMany({
            data: data
        })

        const group = await prisma.group.findUnique({
            where: {
                id: groupId
            },
            include: {
                members: {
                    include: {
                        member: true
                    }
                },
                messages: true,
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