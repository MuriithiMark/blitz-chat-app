import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

const useAuthenticatedUser = () => {
    console.log('Use Authenticated User Hook')
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/auth/login")
            return;
        }
    }, [isLoggedIn])

    return;
}

export default useAuthenticatedUser;