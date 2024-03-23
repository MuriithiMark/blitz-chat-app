import { Action, createSlice } from "@reduxjs/toolkit";

import { User } from "../../contexts/auth/AuthContext";
import { Message } from "../app/app.slice";
import { DateSortedMessageArray } from "../../utils/date-sort";

export type GroupMessage = Message & {
    groupId: string;
    from: User
}

export type Group = {
    id: string;
    name: string;
    about: string;
    avatarUrl?: string;
    messages: GroupMessage[];
}

const initialState: Group[] = []

const groupsSlice = createSlice({
    name: "groups",
    initialState: initialState,
    reducers: {
        addGroups: (_state, action: Action & { payload: Group[] }) => {
            const groups = action.payload.map((group) => {
                return {
                    ...group,
                    messages: DateSortedMessageArray(group.messages)
                }
            })
            return groups;
        },
        newGroupMessage: (state, action: Action & { payload: GroupMessage }) => {
            return state.map(group => {
                if (group.id === action.payload.groupId) {
                    return {
                        ...group,
                        messages: DateSortedMessageArray([...group.messages, action.payload])
                    }
                }
                return group
            })
        }
    }
})

export const { addGroups, newGroupMessage } = groupsSlice.actions;

export default groupsSlice.reducer;