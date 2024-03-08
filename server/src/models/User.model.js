import prisma from "../prisma.js";

const create = async (newUser) => {
    try {
        const user = await prisma.user.create({
            data: newUser
        })
        return user
    } catch (error) {
        console.error(`[UserModel]`, error);
        throw new Error("failed to create user")
    }
}

const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        console.error(`[UserModel] `, error);
        throw new Error("failed to get all users")
    }
}

const getUserById = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return user
    } catch (error) {
        console.error(`[UserModel]`, error);
        throw new Error("failed to get user by id")
    }
}

const getUserByUsername = async (username) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        return user
    } catch (error) {
        console.error(`[UserModel]`, error);
        throw new Error("failed to get user by username")
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return user;
    } catch (error) {
        console.error(`[UserModel]`, error);
        throw new Error("failed to create user")
    }
}

const updateUser = async (updatedUserData) => {
    try {
        const user = await prisma.user.update({
            where: { id: updatedUserData.id },
            data: updatedUserData
        })
        return user
    } catch (error) {
        console.error(`[UserModel]`, error);
        throw new Error("failed to create user")
    }
}

const deleteUser = async (userId) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: userId
            }
        })
        return user;
    } catch (error) {
        console.error(`[UserModel]`, error);
        throw new Error("failed to delete user")
    }
}



const UserModel = {
    create,
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    updateUser,
    deleteUser
}

export default UserModel;