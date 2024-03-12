import { createSlice } from "@reduxjs/toolkit"

/**
 * @type { {  messages: any[], data: any, context: string } }
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
        },
        onNewMessage: (state, action) => {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        }
    }
})

export const { onChatLeave, onChatSelect, onFetchMessages, onNewMessage } = chatContainerSlice.actions;
export default chatContainerSlice.reducer