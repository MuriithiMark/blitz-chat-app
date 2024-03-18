import { createEntityAdapter } from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter()

/**
 * @param { import("../../types/builder-function.d").BuilderFunction} builder
 */
export const getMessages = (builder) => builder
    .query({
        query: ({ socket, context, contextData }) => `/${context}/messages/${contextData.id}`,
        transformResponse: (response) => messagesAdapter.addMany(
            messagesAdapter.getInitialState(),
            response.messages
        ),
        providesTags: (result, error) => {
            if (error) {
                return;
            }
            return [{ type: "Messages", id: result.id }]
        },
        /**
         * 
         * @param {{
         *  socket: import("../../types/socket-definition.d").SocketDef,
         *  context: string, 
         *  contextData: any}} param0 
         */
        async onCacheEntryAdded(
            { socket, context, contextData },
            { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
        ) {
            socket.auth = { contextData };

            await cacheDataLoaded;

            const onNewMessage = async ({ data }) => {
                if (data.status === 'fail') {
                    console.error("ChatSocket listening to new message ", data, " from ");
                    return;
                }

                updateCachedData((draft) => {
                    messagesAdapter.upsertOne(draft, data.message)
                })
            }
            socket.on("messages/new", onNewMessage);

            await cacheEntryRemoved;
            socket.close()
        }
    })

/**
 * @param {import("../../types/builder-function.d").BuilderFunction} builder
 */
export const getMessageById = (builder) => builder
    .query({
        query: ({ context, contextId, messageId }) => `/${context}/messages/${$contextId}/${messageId}`,
        transformResponse: (response) => response.message,
        transformErrorResponse: (response) => response.data.message,
        providesTags: (result, error, { messageId }) => [{ type: "Messages", id: messageId }]
    })