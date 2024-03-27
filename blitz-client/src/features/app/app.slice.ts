import { Action, createSlice } from "@reduxjs/toolkit";
import { Friend } from "../friends/friends.slice";
import { Group } from "../groups/groups.slice";

export interface Message {
    id: string;
    content: string
    hasFile: boolean;
    filePath?: string;
    fileType?: string;
    createdAt: Date;
}

type App = {
    socketFired: boolean;
    contextId?: string;
    isGroup: boolean;
    data?: Group | Friend
}


const initialState: App = {
    socketFired: false,
    contextId: undefined,
    data: undefined,
    isGroup: false,
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setContext: (state, action: Action & { payload: Omit<App, "socketFired"> }) => {
            console.log('reset done ', action.payload)
            state.contextId = action.payload.contextId;
            state.isGroup = action.payload.isGroup;
            state.data = action.payload.data;
        },
        fireSocket: (state) => {
            state.socketFired = true;
        },
        newContextMessage: (state, action: Action & { payload: unknown }) => {
            console.log('setting context')
            // @ts-ignore
            state.data!.messages = [...state.data!.messages, action.payload];
        },
    }
})

export const { setContext, fireSocket, newContextMessage } = appSlice.actions;

export default appSlice.reducer;