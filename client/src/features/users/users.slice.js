import { createSlice } from "@reduxjs/toolkit";

const initialUsersState = [];

const usersSlice = createSlice({
    name: "users",
    initialState: initialUsersState,
    reducers: {
        addUsers: (state, action) => {
            return action.payload
        },
        removeAllUsers: (state, action) => {
            return []
        }
    }
})


export const { addUsers, removeAllUsers} = usersSlice.actions;
export default usersSlice.reducer