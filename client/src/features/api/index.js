import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../utils/constants";
import { loginUser, registerUser } from "./auth.api";
import { getAllUsers, getUserById } from "./users.api";


// combines all apis
const Api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL, credentials: "include" }),
    tagTypes: ["Auth", "Users", "Messages"],
    endpoints: (builder) => ({
        loginUser: loginUser(builder),
        registerUser: registerUser(builder),
        // Users
        getAllUsers: getAllUsers(builder),
        getUserById: getUserById(builder),
    })
})

export const {
    useLoginUserMutation,
    useRegisterUserMutation,

    useGetAllUsersQuery,
    useGetUserByIdQuery,
} = Api;

export default Api;