import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/auth.slice";
import usersReducer from "./users/users.slice";
import tabsReducer from "./tabs/tabs.slice";
import chatContainerReducer from "./chats/chat-container.slice";
import Api from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        [Api.reducerPath]: Api.reducer,
        auth: authReducer,
        users: usersReducer,
        tabs: tabsReducer,
        chatContainer: chatContainerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(Api.middleware),
})

setupListeners(store.dispatch)

export default store;