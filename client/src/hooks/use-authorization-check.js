import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

/**
 * 
 * @param {{message: string}} error 
 */
const useAuthorizationCheck = (error) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!error) {
            return;
        }

        if (error.message.includes("unauthorized")) {
            return navigate("/auth/login")
        }
    }, [error])
}

export default useAuthorizationCheck;