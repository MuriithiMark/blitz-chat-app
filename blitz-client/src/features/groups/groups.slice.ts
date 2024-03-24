import { Action, createSlice } from "@reduxjs/toolkit";

import { User } from "../../contexts/auth/AuthContext";
import { Message } from "../app/app.slice";
import { DateSortedMessageArray } from "../../utils/date-sort";

export type GroupMessage = Message & {
    groupId: string;
    fromId: string;
    from: User
}

export type Group = {
    id: string;
    name: string;
    about: string;
    avatarUrl?: string;
    createdAt: Date;
    messages: GroupMessage[];
    members: { user: User }[]
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
        createNewGroup: (_state, action: Action & { payload: Group }) => {
            return [..._state, action.payload]
        },
        updateGroup: (state, action: Action & { payload: Group }) => {
            return state.map((group) => {
                if (group.id === action.payload.id) {
                    return {
                        ...action.payload,
                        messages: DateSortedMessageArray(action.payload.messages)
                    }
                }
                return group
            })
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

export const { addGroups, newGroupMessage, updateGroup, createNewGroup } = groupsSlice.actions;

export default groupsSlice.reducer;