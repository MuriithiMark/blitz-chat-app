import prisma from "../prisma.js";

const create = async (newGroup) => {
    try {
        const existingGroup = await prisma.group.findFirst({
            where: {
                name: newGroup.name
            }
        })
        if (existingGroup) {
            throw new Error('group already exists')
        }
        const group = await prisma.group.create({
            data: newGroup,
            include: {
                members: true,
                messages: true
            }
        });
        return group;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

const update = async (updatedGroup) => {
    try {
        const group = await prisma.group.update({
            where: {
                id: updatedGroup.id
            },
            data: updatedGroup
        })
        return group;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteGroup = async (groupId) => {
    try {
        const group = await prisma.group.delete({
            where: {
                id: groupId
            }
        })
        return group;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getGroupById = async (groupId) => {
    try {
        const group = await prisma.group.findUnique({
            where: {
                id: groupId
            }
        })
        return group;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getAllGroups = async (groupId) => {
    try {
        const groups = await prisma.group.findMany();
        return groups
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const GroupModel = {
    create,
    update,
    deleteGroup,
    getGroupById,
    getAllGroups
}

export default GroupModel;