/**
 * 
 * @param {import("../../types/builder-function.d").BuilderFunction} builder 
 */
export const getAllUsers = (builder) => builder
    .query({
        query: () => '/users',
        transformResponse: (response, meta, args) => response.users,
        transformErrorResponse: (response, meta, args) => response.data.message,
        providesTags: (result) => {
            return (
                result ? [
                    ...result.map(({ id }) => ({ type: "Users", id })),
                    { type: "Users", id: "LIST" }
                ] : [{ type: "Users", id: "LIST" }]
            )
        }
    })

/**
 * @param {import("../../types/builder-function.d").BuilderFunction} builder
 */
export const getUserById = (builder) => builder
    .query({
        query: (userId) => `/users/${userId}`,
        transformResponse: (response) => response.user,
        transformErrorResponse: (response) => response.data.message,
        providesTags: (result) => result ? [{ type: "Users", id: result.id }] : [{ type: "Users", id: "LIST" }]
    })

