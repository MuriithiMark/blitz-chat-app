import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useVerifyTokenQuery } from "../features/api";


/**
 * 
 * @param {boolean} isAuthPage - should be `true` only in `/auth/login` or `/auth/login`
 * @returns {[object, boolean]} [user, isLoading]
 */
const useAuthenticatedUser = (isAuthPage = false) => {
    const navigate = useNavigate()
    const { data, isLoading, isSuccess, isError } = useVerifyTokenQuery();

    useEffect(() => {
        if (!isAuthPage && isError) {
            return navigate("/auth/login");
        }
        if (isAuthPage && isSuccess) {
            return navigate('/')
        }
    }, [isError, isSuccess]);

    return [data, isLoading]
}

export default useAuthenticatedUser;