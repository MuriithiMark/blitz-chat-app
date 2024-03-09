import { SERVER_URL } from "../../utils/constants"

const getAllUsers = async () => {
    const USERS_URL = `${SERVER_URL}/users`;
    try {
        const response = await fetch(USERS_URL, {
            credentials: "include"
        })
        const data = await response.json();
        if (data.status === "fail") {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error
    }
}


export {
    getAllUsers
}