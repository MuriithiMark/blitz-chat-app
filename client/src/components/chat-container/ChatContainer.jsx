import React from "react";

import "./chat-container.scss";
import ChatHeader from "./chat-header/ChatHeader";
import ChatFooter from "./chat-footer/ChatFooter";
import ChatContent from "./chat-content/ChatContent";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { groupSocket } from "../../services/socket";

const ChatContainer = () => {
  const context = useSelector((state) => state.chatContainer.context);
  const contextData = useSelector((state) => state.chatContainer.data);

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
