import { createSlice } from "@reduxjs/toolkit"

/**
 * @type { {  messages: any[], data: any, context: string } }
 */
const initialChatState = {
    messages: [],
    data: null,
    context: null,
    // Ensure only one listener per communication, multiple event listeners created in useEffect
    hasListener: false
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
                messages: [],
                data: null,
                context: null,
                hasListener: false
            }
        },
        onFetchMessages: (state, action) => {
            console.log('Fetched Messages')
            return {
                ...state,
                messages: action.payload
            }
        },
        onNewMessage: (state, action) => {
            console.log('Added New Message')
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        },
        registerListener: (state, action) => {
            console.log(`Adding Listener`);
            return {
                ...state,
                hasListener: true
            }
        }
    }
})

export const { onChatLeave, onChatSelect, onFetchMessages, onNewMessage, registerListener } = chatContainerSlice.actions;
export default chatContainerSlice.reducer