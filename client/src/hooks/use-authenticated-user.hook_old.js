import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { chatSocket } from "../services/socket";
import { SERVER_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { onLogin } from "../features/auth/auth.slice";

/**
 * 
 * @deprecated
 */
const useAuthenticatedUser_Old = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    // connect user to socket
    const connectToChatSocket = async () => {
        if(!user) return;
        chatSocket.auth = { user };
        chatSocket.connect();
    };

    const verifyToken = async () => {
        const response = await fetch(`${SERVER_URL}/auth/verify-token`, {
            credentials: "include"
        });
        const data = await response.json();
        if (data.status === 'fail') {
            return navigate("/auth/login");
        }
        console.log('Verify Token', data)
        dispatch(onLogin(data.user))
        connectToChatSocket()
    }


    useEffect(() => {
        verifyToken();

        return () => {
            chatSocket.close()
        }
    }, [isLoggedIn])

    return;
}

export default useAuthenticatedUser_Old;