import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useVerifyTokenQuery } from "../features/api";


const useAuthenticatedUser = (options = { isAuthPage: false, redirectTo: null, onError: null }) => {
    const { isAuthPage, redirectTo, onError } = options;
    
    const navigate = useNavigate()

    const { data, error, isLoading, isSuccess, isError } = useVerifyTokenQuery(isAuthPage);

    useEffect(() => {
        if (isError) {
            if (onError) return onError(error)
            if (!isAuthPage) return navigate('/auth/login')
        }

        if (isSuccess && isAuthPage) return navigate(redirectTo ?? "/");
    }, [isError, isSuccess])

    return [data, isLoading]
}

export default useAuthenticatedUser;