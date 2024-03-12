import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { chatSocket } from "../../../services/socket";
import { onNewMessage } from "../../../features/chats/chat-container.slice";

const ChatContent = ({ className }) => {
  const messages = useSelector((state) => state.chatContainer.messages);

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
      {messages.map((message) => {
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
