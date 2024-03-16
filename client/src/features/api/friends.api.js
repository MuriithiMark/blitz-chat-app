
/**
 * @param {import("../../types/builder-function.d").BuilderFunction} builder
 */
export const getUserFriends = (builder) => builder
    .query({
        query: () => `/users/friends`,
        transformResponse: (response) => response.friends,
        transformErrorResponse: (response) => response.data.message,
        providesTags: (result) => {
            return result ? [
                ...result.map(({ id }) => ({ type: "Friends", id })),
                { type: "Friends", id: "LIST" }
            ] : [{ type: "Friends", id: "LIST" }]
        }
    })

/**
 * @param {import("../../types/builder-function.d").BuilderFunction}
 */
export const getUserFriendById = (builder) => builder
    .query({
        query: (friendId) => `/users/friends/${friendId}`,
        transformResponse: (response) => response.friend,
        transformErrorResponse: (response) => response.data,
        providesTags: (result, error, friendId) => [{ type: "Friends", id: friendId }],
        invalidateTags: (result, error, friendId) => {
            if (error.status === 401) {
                return [{ type: "Auth", id: "verify-token" }]
            }
            return [{ type: "Friends", id: friendId }]
        },
    })

/**
 * @param {import("../../types/builder-function.d").BuilderFunction}
 */
export const sendFriendRequest = (builder) => builder
    .mutation({
        query: (friendId) => `/users/friends/${friendId}/new`,
        transformResponse: (response) => response.friend,
        transformErrorResponse: (response) => response,
        providesTags: (result, error, friendId) => [{ type: "Friends", id: friendId }],
        invalidateTags: (result, error, friendId) => {
            if (error.status === 401) {
                return [{ type: "Auth", id: "verify-token" }]
            }
            return [{ type: "Friends", id: friendId }]
        },
    })


export const acceptFriendRequest = (builder) => builder
    .mutation({
        query: (friendId) => `/users/friends/${friendId}/accept`,
        transformResponse: (response) => response.friend,
        transformErrorResponse: (response) => response,
        providesTags: (result, error, friendId) => [{ type: "Friends", id: friendId }],
        invalidateTags: (result, error, friendId) => {
            if (error.status === 401) {
                return [{ type: "Auth", id: "verify-token" }]
            }
            return [{ type: "Friends", id: friendId }]
        }
    })



/**
 * 
 * @param {import("../../types/builder-function.d").BuilderFunction} builder 
 */
export const declineFriendRequest = (builder) => builder
    .mutation({
        query: (friendId) => `/users/friends/${friendId}/decline`,
        transformResponse: (response) => response.friend,
        transformErrorResponse: (response) => response,
        providesTags: (result, error, friendId) => [{ type: "Friends", id: friendId }],
        invalidateTags: (result, error, friendId) => {
            if (error.status === 401) {
                return [{ type: "Auth", id: "verify-token" }]
            }
            return [{ type: "Friends", id: friendId }]
        },
    })