import { SERVER_URL } from "../../utils/constants"

const getMessagesWithContext = async ({ context, id }) => {
    if (!context) {
        throw new Error("invalid context")
    }
    try {
        const CONTEXT_URL = context === "group" ? "group/messages" : "users/messages";
        const MESSAGES_URL = `${SERVER_URL}/${CONTEXT_URL}/${id}`;

        const response = await fetch(MESSAGES_URL, {
            credentials: "include"
        });
        const data = await response.json();
        if (data.status === "fail") {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error
    }
}

export {
    getMessagesWithContext
}