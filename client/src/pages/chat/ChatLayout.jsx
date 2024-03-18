import React from "react";
import { Outlet } from "react-router-dom";

import "./chat-layout.scss";
import ChatSideBar from "../../components/chat-container/chat-sidebar/ChatSidebar";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser.hook";

const ChatLayout = () => {
  useAuthenticatedUser();
  return (
    <main className="main">
      <ChatSideBar className="chat-side-bar" />
      <div className="page-container">
        <Outlet />
      </div>
    </main>
  );
};

export default ChatLayout;
