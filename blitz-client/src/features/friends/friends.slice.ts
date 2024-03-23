import { Action, createSlice } from "@reduxjs/toolkit";

export type FriendshipMessage = {
    id: string;
    content: string;
    friendShipId: string;
    createdAt: Date;
    senderId: string;
    recipientId: string;
}

export type Friend =
    {
        id: string;
        username: string,
        email: string,
        avatarUrl: string
        name: string;
        friendShipId: string;
        toId?: string;
        fromId?: string;
        messages: FriendshipMessage[];
    }


const initialState: Friend[] = []
const friendsSlice = createSlice({
    name: 'friends',
    initialState: initialState,
    reducers: {
        addFriends: (_state, action: Action & { payload: Friend[] }) => {
            return action.payload;
        }
    }
})

export const { addFriends } = friendsSlice.actions;

export default friendsSlice.reducer;