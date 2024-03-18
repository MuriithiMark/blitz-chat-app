import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { SERVER_URL } from "../../utils/constants";
import { loginUser, logoutUser, registerUser, verifyToken } from "./auth.api";
import { getAllUsers, getUserById } from "./users.api";
import { acceptFriendRequest, declineFriendRequest, getUserFriendById, getUserFriends, sendFriendRequest } from "./friends.api";
import { getMessagingContext, getMessages, getMessageById } from "./messages.api";


// combines all apis
const Api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL, credentials: "include" }),
    tagTypes: ["Auth", "Users", "Friends", "Messages"],
    endpoints: (builder) => ({
        // Auth
        loginUser: loginUser(builder),
        registerUser: registerUser(builder),
        verifyToken: verifyToken(builder),
        logoutUser: logoutUser(builder),

        // Users
        getAllUsers: getAllUsers(builder),
        getUserById: getUserById(builder),

        // Friends
        getUserFriends: getUserFriends(builder),
        getUserFriendById: getUserFriendById(builder),
        sendFriendRequest: sendFriendRequest(builder),
        acceptFriendRequest: acceptFriendRequest(builder),
        declineFriendRequest: declineFriendRequest(builder),

        // Messages
        // Messaging Context -> friendShip/group
        getMessagingContext: getMessagingContext(builder),
        getMessages: getMessages(builder),
        getMessageById: getMessageById(builder)
    })
})

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useVerifyTokenQuery,
    useLogoutUserQuery,

    useGetAllUsersQuery,
    useGetUserByIdQuery,

    useGetUserFriendsQuery,
    useGetUserFriendByIdQuery,
    useSendFriendRequestMutation,
    useAcceptFriendRequestMutation,
    useDeclineFriendRequestMutation,

    useGetMessagingContextQuery,
    useGetMessagesQuery,
    useGetMessageByIdQuery
} = Api;

export default Api;