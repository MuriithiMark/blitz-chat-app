import { SERVER_URL } from "../../utils/constants"

const FRIENDS_URL = `${SERVER_URL}/users/friendship`;

const sendFriendRequest = async (friendId) => {
    try {
        // TODO add code here
        const SEND_FRIEND_REQUEST_URL = `${FRIENDS_URL}/${friendId}`;
        const response = await fetch(SEND_FRIEND_REQUEST_URL, {
            method: "post",
            credentials: "include"
        })
        const data = await response.json();
        console.log('Response Data ', data);
        if(data.status === "fail") {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw error
    }
}


const getFriendShipById  = async (friendId) => {
    try {
        const GET_FRIEND_URL = `${FRIENDS_URL}/${friendId}`;
        const response = await fetch(GET_FRIEND_URL,{
            credentials: "include"
        });
        const data = await response.json();
        // No need to throw error, return data as is, since data.friendShip will be null either way
        // if(data.status === 'fail') {
        //     throw new Error(data.message)
        // }
        return data
    } catch (error) {
        throw error
    }
}

const acceptFriendRequest = async (friendShipId) => {
    try {
        const ACCEPT_REQUEST_URL = `${FRIENDS_URL}/accept/${friendShipId}`;
        const response = await fetch(ACCEPT_REQUEST_URL,{
            credentials: "include"
        });
        const data = await response.json();
        if(data.status === 'fail') {
            throw new Error(data.message)
        }
    } catch (error) {
        throw error
    }
}

const declineFriendRequest = async (friendShipId) => {
    try {
        const DECLINE_REQUEST_URL = `${FRIENDS_URL}/decline/${friendShipId}`;
        const response = await fetch(DECLINE_REQUEST_URL, {
            credentials: "include"
        });
        const data = await response.json();
        if(data.status === 'fail') {
            throw new Error(data.message)
        }
    } catch (error) {
        throw error
    }
}



export {
    sendFriendRequest,
    getFriendShipById,
    acceptFriendRequest,
    declineFriendRequest
}