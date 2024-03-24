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

type MembersIds = {
    members: string[]
}

const addGroupMembers = async (groupId: string, data: MembersIds): Promise<Group> => {
    try {
        const response = await axios.post(`/groups/members/${groupId}`, data);
        console.log(response.data.group)
        return response.data.group;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export {
    getUserGroups,
    addGroupMembers
}