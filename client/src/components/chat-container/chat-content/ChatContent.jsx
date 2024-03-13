import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { chatSocket } from "../../../services/socket";
import { onNewMessage } from "../../../features/chats/chat-container.slice";
import { getMessagesWithContext } from "../../../services/api/messages.api";

const ChatContent = ({ className }) => {
  const chatContainer = useSelector((state) => state.chatContainer);

  const { error, isLoading, data } = useQuery({
    queryKey: [`get_messages_${chatContainer.data.friendShipId}`],
    queryFn: () =>
      getMessagesWithContext({
        context: chatContainer.context,
        id:
          chatContainer.content === "group"
            ? chatContainer.data.id
            : chatContainer.data.friendShipId,
      }),
  });

  if (isLoading) {
    return <div className={className}>Loading ....</div>;
  }

  if (error) {
    return (
      <div className={className}>
        <span style={{ color: "red" }}>{error.message}</span>
      </div>
    );
  }

  useEffect(() => {}, []);

  chatSocket.on("new", ({ from, data }) => {
    console.log("New Message Received from ", from);
    if (data.status === "fail") {
      console.log(data);
      return;
    }
    dispatchEvent(onNewMessage(data.message));
  });

  return (
    <div className={className}>
      {chatContainer.messages.map((message) => {
        return (
          <div key={message.id}>
            <span>{message.content}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatContent;
