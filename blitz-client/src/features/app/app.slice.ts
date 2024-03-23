import { Action, createSlice } from "@reduxjs/toolkit";
import { Friend, FriendshipMessage } from "../friends/friends.slice";



type App = {
    socketFired: boolean;
    contextId?: string;
    data?: Friend;
    isGroup: boolean;
    // messages: Message[]
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
            return { ...state, ...action.payload };
        },
        fireSocket: (state) => {
            state.socketFired = true;
        },
        setContextId: (state, action: Action & { payload: string }) => {
            state.contextId = action.payload;
        },
        setData: (state, action: Action & { payload: Friend }) => {
            state.data = action.payload;
        },
        setIsGroup: (state, action: Action & { payload: boolean }) => {
            state.isGroup = action.payload;
        },
        setMessages: (state, action: Action & { payload: FriendshipMessage[] }) => {
            state.data!.messages = action.payload;
        }
    }
})

export const { setContext, fireSocket } = appSlice.actions;

export default appSlice.reducer;