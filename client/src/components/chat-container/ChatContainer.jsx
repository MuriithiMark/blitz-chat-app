import React from "react";

import "./chat-container.scss";
import ChatHeader from "./chat-header/ChatHeader";
import ChatFooter from "./chat-footer/ChatFooter";
import ChatContent from "./chat-content/ChatContent";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { chatSocket, groupSocket } from "../../services/socket";
import ChatSideBar from "./chat-sidebar/ChatSidebar";

const ChatContainer = ({ friendId }) => {
  const context = useSelector((state) => state.chatContainer.context);
  const contextData = useSelector((state) => state.chatContainer.data);

  useEffect(() => {
    if (context !== "group") {
      return;
    }

    const connectToGroupSocket = async () => {
      groupSocket.auth = { group: contextData };
      groupSocket.connect();
    };

    connectToGroupSocket();

    const disconnectToSockets = async () => {
      if (context === "group") {
        groupSocket.close();
      }
      if (context === "user") {
        chatSocket.close();
      }
    };

    return disconnectToSockets;
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-main">
        {context ? (
          <>
            <ChatHeader className="chat-header" />
            <ChatContent className="chat-content" />
            <ChatFooter className="chat-footer" />
          </>
        ) : (
          <span className="none-selected">
            Choose a friend or group to message!
          </span>
        )}
      </div>
      <ChatSideBar className="chat-sidebar" />
    </div>
  );
};

export default ChatContainer;
