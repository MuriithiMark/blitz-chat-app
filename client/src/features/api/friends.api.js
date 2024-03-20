
/**
 * @param {import("../../types/builder-function.d").BuilderFunction} builder
 */
export const getUserFriends = (builder) => builder
    .query({
        query: () => `/friends`,
        transformResponse: (response) => response.friends,
        transformErrorResponse: (response) => response.data.message,
        providesTags: (result) => {
            return result ? [
                ...result.map(({ id }) => ({ type: "Friends", id })),
                { type: "Friends", id: "LIST" }
            ] : [{ type: "Friends", id: "LIST" }]
        },
        invalidateTags: (result, error) => {
            if (error.status === 401) {
                return [{ type: "Auth", id: "verify-token" }]
            }
            return [{ type: "Friends" }]
        }
    })

/**
 * @param {import("../../types/builder-function.d").BuilderFunction}
 */
export const getUserFriendById = (builder) => builder
    .query({
        query: (friendId) => `/friends/users/${friendId}`,
        transformResponse: (response) => response.friend,
        transformErrorResponse: (response) => response.data.message,
        providesTags: (result, error, friendId) => {
            if(error) {
                return [{type: "Friends", id: "LIST"}]
            }
            return  [{ type: "Friends", id: result.id }]
        },
        invalidateTags: (result, error, friendId) => {
            console.log('Result: ', result)
            if (error.status === 401) {
                return [{ type: "Auth", id: "verify-token" }]
            }
            return [{ type: "Friends", id: result.id }]
        },
    })

/**
 * @param {import("../../types/builder-function.d").BuilderFunction}
 */
export const sendFriendRequest = (builder) => builder
    .mutation({
        query: (friendId) => ({
            url: `/friends/new/${friendId}`,
            method: "POST",
        }),
        transformResponse: (response) => response.friend,
        transformErrorResponse: (response) => response,
        providesTags: (result, error, friendId) => [{ type: "Friends", id: result.id }],
        invalidateTags: (result, error, friendId) => {
            if (error.status === 401) {
                return [{ type: "Auth", id: "verify-token" }]
            }
            return [{ type: "Friends", id: result.id }]
        },
    })


export const acceptFriendRequest = (builder) => builder
    .mutation({
        query: (friendShipId) => `/friends/accept/${friendShipId}`,
        transformResponse: (response) => response.friend,
        transformErrorResponse: (response) => response,
        providesTags: (result, error, friendShipId) => [{ type: "Friends", id: result.id }],
        invalidateTags: (result, error, friendShipId) => {
            if (error.status === 401) {
                return [{ type: "Auth", id: "verify-token" }]
            }
            return [{ type: "Friends", id: result.id }]
        }
    })



/**
 * 
 * @param {import("../../types/builder-function.d").BuilderFunction} builder 
 */
export const declineFriendRequest = (builder) => builder
    .mutation({
        query: (friendShipId) => `/friends/decline/${friendShipId}`,
        transformResponse: (response) => response.friend,
        transformErrorResponse: (response) => response,
        providesTags: (result, error, friendShipId) => [{ type: "Friends", id: result.id }],
        invalidateTags: (result, error, friendShipId) => {
            if (error.status === 401) {
                return [{ type: "Auth", id: "verify-token" }]
            }
            return [{ type: "Friends", id: result.id }]
        },
    })