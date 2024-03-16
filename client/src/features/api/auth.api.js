
/**
 * 
 * @param {import("../../types/builder-function.d").BuilderFunction} builder 
 */
export const loginUser = (builder) => builder
    .mutation({
        query: (loginData) => ({
            url: '/auth/login',
            method: "POST",
            body: loginData
        }),
        transformResponse: (response) => response.data,
        transformErrorResponse: (response) => response.data
    })


/**
 * @param {import("../../types/builder-function.d").BuilderFunction} builder
 */
export const registerUser = (builder) => builder
    .mutation({
        query: (registerData) => ({
            url: '/auth/register',
            method: "POST",
            body: registerData,
        }),
        transformResponse: (response) => response.data,
        transformErrorResponse: (response) => response.data,
    })