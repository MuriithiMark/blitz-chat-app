import {configureStore} from "@reduxjs/toolkit"
import modalSlice from "./modals/modal.slice";
import friendsSlice from "./friends/friends.slice";
import appSlice from "./app/app.slice";

const store = configureStore({
    reducer: {
        app: appSlice,
        modal: modalSlice,
        friends: friendsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;