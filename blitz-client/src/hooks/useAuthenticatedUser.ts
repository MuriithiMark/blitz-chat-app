import React from 'react'
import useSWR from "swr"

const useAuthenticatedUser = () => {
    const { data, error, isLoading } = useSWR()
    return {}
}

export default useAuthenticatedUser