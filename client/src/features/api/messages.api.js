import { createEntityAdapter } from "@reduxjs/toolkit";
import { groupSocket, userSocket } from "../../services/socket";

const messagesAdapter = createEntityAdapter()

/**
 * @param { import("../../types/builder-function.d").BuilderFunction} builder
 */
export const getMessages = (builder) => builder
    .query({
        query: ({ context, contextId }) => `/${context}/messages/${contextId}`,
        transformResponse: (response) => messagesAdapter.addMany(
            messagesAdapter.getInitialState(),
            response.messages
        ),
        providesTags: (result) => result ?
            [
                ...result.ids.map((id) => ({ type: "Messages", id })),
                { type: "Messages", id: "LIST" }
            ] :
            [{ type: "Messages", id: "LIST" }],
        invalidatesTags: ["Messages"],
        async onCacheEntryAdded(
            { context, authData },
            { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
        ) {
            /**@type {import("../../types/socket-definition.d").SocketDef} */
            let socket = null;
            if (context === "groups") {
                socket = groupSocket;
                socket.auth = { group: authData }
            }
            else if (context === "friends") {
                socket = userSocket
                socket.auth = { user: authData }
            }

            if (!socket.connected) {
                socket.connect();
            }

            await cacheDataLoaded;

            const onNewMessage = async ({ data }) => {
                if (data.status === 'fail') {
                    console.error("/messages/new ", data);
                    return;
                }

                updateCachedData((draft) => {
                    messagesAdapter.upsertOne(draft, data.message)
                })
            }
            socket.on("/messages/new", onNewMessage);

            await cacheEntryRemoved;
            socket.close()
        }
    })

/**
 * @param {import("../../types/builder-function.d").BuilderFunction} builder
 */
export const getMessageById = (builder) => builder
    .query({
        query: ({ context, messageId }) => `/${context}/messages/${$contextId}/${messageId}`,
        transformResponse: (response) => response.message,
        transformErrorResponse: (response) => response.data.message,
        providesTags: (result, error, { messageId }) => [{ type: "Messages", id: messageId }]
    })


/**
 * @param {import("../../types/builder-function.d").BuilderFunction} builder 
 */
export const getMessagingContext = (builder) => builder
    .query({
        query: ({ context, contextId }) => {
            console.log({ context, contextId });
            return `/${context}/${contextId}`
        },
        transformResponse: (response) => response.friendShip,
        transformErrorResponse: (response) => {
            console.log(response)
            return response
        },
        providesTags: (result, error, { context, contextId }) => [{ type: "Messages", id: `${context}/${contextId}` }],
        invalidatesTags: (result, error) => {
            if (error.status === 401) {
                return [{ type: "Auth", id: "verify-token" }]
            }
            return [{ type: "Messages" }]
        }
    })