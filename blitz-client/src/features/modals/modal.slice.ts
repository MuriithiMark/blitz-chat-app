import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        "login": {
            "open": false,
        },
        "register": {
            "open": false,
        },
        "create_group": {
            open: false,
        }
    },
    reducers: {
        toggleLogin: (state) => {
            state.login.open =!state.login.open;
            state.register.open = false;
            state.create_group.open = false;
        },
        toggleRegister: (state) => {
            state.register.open =!state.register.open;
            state.login.open = false;
            state.create_group.open = false;
        },
        toggleCreateGroup: (state) => {
            state.create_group.open =!state.create_group.open;
            state.register.open = false;
            state.login.open = false;
        },
        closeAllModals: (state) => {
            state.login.open = false;
            state.register.open = false;
            state.create_group.open = false;
        },
    }
})

export const {toggleLogin, toggleRegister, closeAllModals} = modalSlice.actions;

export default modalSlice.reducer;