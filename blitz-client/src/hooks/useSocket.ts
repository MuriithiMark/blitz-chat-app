import { useContext, useEffect } from "react"
import { useDispatch } from "react-redux";

import socket from "../services/socket"
import AuthContext from "../contexts/auth/AuthContext"
import store from "../features/store";
import { newContextMessage } from "../features/app/app.slice";
import { Friend, FriendshipMessage, newFriendsMessage } from "../features/friends/friends.slice";
import { GroupMessage, newGroupMessage } from "../features/groups/groups.slice";
import { Notification, newNotification } from "../features/notifications/notifications.slice";

type NewUserMessageResponse = {
    status: 'success',
    message: FriendshipMessage
} | {
    status: "fail";
    message: string;
}

type NewGroupMessageResponse = ({
    status: 'success',
    message: GroupMessage
} | {
    status: 'fail';
    message: string
})

type NewNotificationResponse = ({
    status: 'success',
    notification: Notification
} | {
    status: 'fail',
    message: string
})

const useSocket = () => {
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();


    const onNewUserMessage = async (data: NewUserMessageResponse) => {
        if (data.status === "fail") {
            console.error(data);
            return;
        }

        const { message } = data;
        const app = store.getState().app;

        if (message.friendShipId === (app.data as Friend).friendShipId) {
            dispatch(newContextMessage(message));
        }
        dispatch(newFriendsMessage(message))
    }

    const onNewGroupMessage = async (data: NewGroupMessageResponse) => {
        if (data.status === 'fail') {
            console.error(data);
            return;
        }
        const { message } = data;
        const app = store.getState().app;
        console.log({ 'group-received ': message });
        if (message.groupId === app.data?.id) {
            dispatch(newContextMessage(message))
        }
        dispatch(newGroupMessage(message))
    }

    const onNewNotification = async (data: NewNotificationResponse) => {
        console.log('Notification: ', data)
        if (data.status === 'fail') {
            console.error(data);
            return;
        }

        const { notification } = data;
        console.log({ notification })
        const app = store.getState().notifications;
        dispatch(newNotification(notification))
    }

    useEffect(() => {
        if (!user) {
            socket.off()
            socket.disconnect();
            return;
        }

        if (!socket.connected) {
            console.log('Should connect only once')
            socket.auth = { user }
            socket.connect()
            // place all listeners here
            socket.on("/friends/messages/new", onNewUserMessage)
            socket.on("/groups/messages/new", onNewGroupMessage)
            socket.on("/notifications/new", onNewNotification)
        }

        return () => {
            console.log('Disconnected')
            socket.off()
            socket.disconnect()
        }
    }, [user])


    return socket
}

export default useSocket;