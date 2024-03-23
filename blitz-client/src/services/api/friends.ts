import axios from "axios";
import { Friend } from "../../features/friends/friends.slice";


const getUserFriends = async (): Promise<Friend[]> => {
    try {
        const response = await axios.get('/friends');
        return response.data.friends;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export {
    getUserFriends
}