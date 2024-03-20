import { createSlice } from "@reduxjs/toolkit";


const initialModalState = null

const modalSlice = createSlice({
    name: "modals",
    initialState: initialModalState,
    reducers: {
        openModal: (state, action) => {
            return action.payload
        },
        closeModal: (state, action) => {
            return null
        }
    }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;