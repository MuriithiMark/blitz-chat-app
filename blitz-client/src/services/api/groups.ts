import axios from "axios";

import { Group } from "../../features/groups/groups.slice";

const getUserGroups = async (): Promise<Group[]> => {
    try {
        const response = await axios.get("/groups/user");
        return response.data.groups
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export {
    getUserGroups
}