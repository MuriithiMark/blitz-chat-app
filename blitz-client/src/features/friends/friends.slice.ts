import { Action, createSlice } from "@reduxjs/toolkit";
import { Message } from "../app/app.slice";
import { DateSortedMessageArray } from "../../utils/date-sort";

export type FriendshipMessage = Message & {
    friendShipId: string;
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
        createdAt: Date;
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
            const friends = action.payload.map((friend) => {
                return {
                    ...friend,
                    messages: DateSortedMessageArray(friend.messages)
                }
            })
            return friends;
        },
        newFriendsMessage: (state, action: Action & { payload: FriendshipMessage }) => {
            return state.map(friend => {
                if (friend.friendShipId === action.payload.friendShipId) {
                    return {
                        ...friend,
                        messages: DateSortedMessageArray([...friend.messages, action.payload])
                    }
                }
                return friend
            })
        }
    }
})

export const { addFriends, newFriendsMessage } = friendsSlice.actions;

export default friendsSlice.reducer;