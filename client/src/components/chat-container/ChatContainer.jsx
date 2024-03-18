import React from "react";

import "./chat-container.scss";
import ChatHeader from "./chat-header/ChatHeader";
import ChatFooter from "./chat-footer/ChatFooter";
import ChatContent from "./chat-content/ChatContent";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { chatSocket, groupSocket } from "../../services/socket";
import ChatSideBar from "./chat-sidebar/ChatSidebar";
import SearchInput from "../search/search-input/SearchInput";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../features/api";

const ChatContainer = ({ friendId }) => {
  const { context, contextId } = useParams();

  const { messages, error, isLoading, isSuccess, isError } =
    useGetMessagesQuery({
      socket: context === "group" ? groupSocket : chatSocket,
      context,
    });

  return (
    <div className="chat-container">
      {context ? (
        <>
          <ChatHeader className="chat-header" />
          <ChatContent
            className="chat-content"
            context={context}
            messages={messages}
          />
          <ChatFooter
            className="chat-footer"
            socket={context === "group" ? groupSocket : chatSocket}
          />
        </>
      ) : (
        <span className="none-selected">
          Choose a friend or group to message!
        </span>
      )}
    </div>
  );
};

export default ChatContainer;
