import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/auth.slice";
import usersReducer from "./users/users.slice";

export default configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer
    }
})