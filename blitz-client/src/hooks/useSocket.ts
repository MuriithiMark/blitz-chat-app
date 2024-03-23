import { useContext, useEffect, useState } from "react"
import socket from "../services/socket"
import AuthContext from "../contexts/auth/AuthContext"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";
import { fireSocket } from "../features/app/app.slice";

const useSocket = () => {
    const { user } = useContext(AuthContext);
    // const [fired, setFired] = useState(false);
    // const socketFired = useSelector((state: RootState) => state.app.socketFired);
    // const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            socket.off()
            socket.disconnect();
            return;
        }

        // // alter state immediately
        // setFired(true);
        // dispatch(fireSocket())

        // all fired
        // if (socketFired || fired) {
        //     console.log('Socket fired!')
        //     return;
        // }

        if (!socket.connected) {
            console.log('Should connect only once')
            socket.auth = { user }
            socket.connect()
            // place all listeners here
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