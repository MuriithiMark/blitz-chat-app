import { createSlice } from "@reduxjs/toolkit"

/**
 * messages -> array of messages
 * data -> can be a user object or group object
 * context -> chatting with a friend or group
 */
const initialChatState = {
    messages: [],
    data: null,
    context: null,
}

const chatContainerSlice = createSlice({
    name: "chatContainer",
    initialState: initialChatState,
    reducers: {
        onChatSelect: (state, action) => {
            console.log(`onChatSelect `, action.payload)
            return {
                ...state,
                ...action.payload
            }
        },
        onChatLeave: (state, action) => {
            return {
                ...state,
                data: null,
                context: null
            }
        },
        onFetchMessages: (state, action) => {
            return {
                ...state,
                messages: action.payload
            }
        }
    }
})

export const { onChatLeave, onChatSelect, onFetchMessages} = chatContainerSlice.actions;
export default chatContainerSlice.reducer