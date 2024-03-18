import { groupSocket, userSocket } from "../services/socket"

const useSocket = ({ context, authData}) => {
    if(context === "groups") {
        groupSocket.auth = { group: authData }
        if(!groupSocket.connected) {
            groupSocket.connect();
        }
        return groupSocket;
    } else if (context === "friends") {
        userSocket.auth = { user: authData }
        if(!userSocket.connected) {
            userSocket.connect()
        }
        return userSocket
    }
}

export default useSocket;