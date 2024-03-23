import {configureStore} from "@reduxjs/toolkit"
import modalSlice from "./modals/modal.slice";

const store = configureStore({
    reducer: {
        modal: modalSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;