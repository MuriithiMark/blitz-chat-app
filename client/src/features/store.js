import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/auth.slice";
import usersReducer from "./users/users.slice";
import tabsReducer from "./tabs/tabs.slice";
import chatContainerReducer from "./chats/chat-container.slice";

export default configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        tabs: tabsReducer,
        chatContainer: chatContainerReducer,
    }
})