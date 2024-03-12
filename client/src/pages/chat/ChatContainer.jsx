import React from "react";
import { groupSocket } from "../../services/socket";
import { SERVER_URL } from "../../utils/constants";
import { useLoaderData } from "react-router-dom";
import ChatHeader from "../../components/chat-container/chat-header/ChatHeader";
import ChatContent from "../../components/chat-container/chat-content/ChatContent";
import ChatFooter from "../../components/chat-container/chat-footer/ChatFooter";
import { useDispatch } from "react-redux";
import { onChatSelect } from "../../features/chats/chat-container.slice";

export const chatLoader = async ({ request, params }) => {
  const context = params.context;
  const id = params.id;
  console.log("context: ", context, " id: ", id);
  if (context === "group") {
    const GROUP_URL = `${SERVER_URL}/groups/${id}`;
    const response = await fetch(GROUP_URL, {});
    const data = await response.json();
    if (data.status === "fail") {
      return { error: new Error(data.message), context, data: null };
    }
    groupSocket.auth = { group: data.group };
    groupSocket.connect();
    return { error: null, context, data: group };
  }

  if (context === "user") {
    const USER_URL = `${SERVER_URL}/users/${id}`;
    const response = await fetch(USER_URL, {});
    const data = await response.json();
    if (data.status === "fail") {
      return { error: new Error(data.message), context, data: null };
    }
    groupSocket.auth = { group: data.group };
    groupSocket.connect();
    return { error: null, context, data: group };
  }
};

function ChatContainer() {
  const { error, context, data } = useLoaderData();
  const dispatch = useDispatch();

  if (error) {
    if (error.message.includes("not found")) {
      return (
        <div>
          <span>404 Error ${error.message}</span>
        </div>
      );
    }
    return (
      <div>
        <span>{error.message}</span>
      </div>
    );
  }

  if(data) {
    dispatch(onChatSelect({
        context: context,
        data: data,
        messages: []
    }))
  }

  return (
    <div className="chat-container">
      <ChatHeader className={"chat-header"} />
      <ChatContent className={"chat-content"} />
      <ChatFooter className={"chat-footer"} />
    </div>
  );
}

export default ChatContainer;
