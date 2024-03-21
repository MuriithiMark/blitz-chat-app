import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useVerifyTokenQuery } from "../features/api";
import AuthContext from "../contexts/auth/AuthContext";


const useAuthenticatedUser = (options = { isAuthPage: false, verify: false, redirectTo: null, onError: null }) => {
    const { isAuthPage, verify, redirectTo, onError } = options;

    const navigate = useNavigate()

    // const { data, error, isLoading, isSuccess, isError } = useVerifyTokenQuery(isAuthPage);
    const { user, error, isLoading } = useContext(AuthContext);

    useEffect(() => {
        if (verify) {
            verifyToken()
        }
    }, [verify]);


    useEffect(() => {
        if (error) {
            if (onError) return onError(error)
            if (!isAuthPage) return navigate('/auth/login')
        }

        if (user && isAuthPage) return navigate(redirectTo ?? "/");
    }, [error, user])

    return [user, isLoading]
}

export default useAuthenticatedUser;