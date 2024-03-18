
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
        providesTags: [{ type: "Auth", id: "login" }],
        transformResponse: (response) => response.user,
        transformErrorResponse: (response) => response.data,
        invalidatesTags: ["Auth", "Users", "Messages"],
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
        providesTags: [{ type: "Auth", id: "register" }],
        transformResponse: (response) => response,
        transformErrorResponse: (response) => response.data,
        invalidatesTags: ["Auth", "Users", "Messages"],
    })


/**
 * @param {import("../../types/builder-function.d").BuilderFunction} builder
 */
export const logoutUser = (builder) => builder
    .query({
        query: () => ({
            url: '/auth/logout',
            method: "GET"
        }),
        transformErrorResponse: (response) => response.data,
        providesTags: [{ type: "Auth", id: "logout" }],
        invalidatesTags: ["Auth", "Users", "Messages"],
    })

/**
 * 
 * @param {import("../../types/builder-function.d").BuilderFunction} builder 
 */
export const verifyToken = (builder) => builder
    .query({
        query: (isAuthPage) => ({
            url: '/auth/verify-token',
            method: "GET",
        }),
        keepUnusedDataFor: 60 * 60, // token should be reverified after 1hr
        transformResponse: (response) => response.user,
        providesTags: [{ type: "Auth", id: "verify-token" }],
        invalidatesTags: (response, error, isAuthPage) => {
            if(error && isAuthPage) {
                return ["Users", "Messages", "Friends"]
            }
            if (error) {
                return ["Auth", "Users", "Messages"]
            }
        }
    })

// TODO idea to ask user to login/ re-verify their token after around 58 minutes