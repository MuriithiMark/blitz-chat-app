import { Action, createSlice } from "@reduxjs/toolkit";

export type Notification = {
    id: string;
}

const initialState: Notification[] = [];

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: initialState,
    reducers: {
        addNotifications: (_state, action: Action & { payload: Notification[] }) => {
            const notifications = action.payload.map((notification) => {
                return {
                    ...notification,
                }
            })
            return notifications;
        },
        newNotification: (state, action: Action & { payload: Notification }) => {

        },
        markAsRead: (state, action: Action & { payload: { notificationId: string } }) => { }
    }
})


export const { addNotifications, newNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;