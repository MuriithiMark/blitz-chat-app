import { configureStore } from "@reduxjs/toolkit"

import modalSlice from "./modals/modal.slice";
import friendsSlice from "./friends/friends.slice";
import appSlice from "./app/app.slice";
import groupsSlice from "./groups/groups.slice";

const store = configureStore({
    reducer: {
        app: appSlice,
        modal: modalSlice,
        friends: friendsSlice,
        groups: groupsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;