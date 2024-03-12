import React from "react";

import "./chat-container.scss";
import ChatHeader from "./chat-header/ChatHeader";
import ChatFooter from "./chat-footer/ChatFooter";
import ChatContent from "./chat-content/ChatContent";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getMessagesWithContext } from "../../services/api/messages.api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onFetchMessages } from "../../features/chats/chat-container.slice";
import { chatSocket, groupSocket, socket } from "../../services/socket";

const ChatContainer = () => {
  const context = useSelector((state) => state.chatContainer.context);
  const contextData = useSelector((state) => state.chatContainer.data);

  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: ["get_messages"],
    queryFn: () =>
      getMessagesWithContext({
        context: chatContainer.context,
        id: chatContainer.data.id,
      }),
  });

  useEffect(() => {
    // dispatch(onFetchMessages(data.messages));
    // connect to a socket immediately

    if (data) {
      dispatch(onFetchMessages(data.messages));
    }
  }, [data]);

  useEffect(() => {
    if (context !== "group") {
      return;
    }
    const connectToGroupSocket = async () => {
      groupSocket.auth = { group: contextData };
      groupSocket.connect()
    };

    connectToGroupSocket();

    return () => {
      groupSocket.close();
    }
  }, []);

  if (isLoading) {
    return <div className="chat-container"></div>;
  }

  return (
    <div className="chat-container">
      {context ? (
        <>
          <ChatHeader className="chat-header" />
          <ChatContent className="chat-content" />
          <ChatFooter className="chat-footer" />
        </>
      ) : (
        <span>Choose a friend to message!</span>
      )}
    </div>
  );
};

export default ChatContainer;
