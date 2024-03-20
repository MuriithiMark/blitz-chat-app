import React, { useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import "./chat-layout.scss";
import ChatSideBar from "../../components/chat-container/chat-sidebar/ChatSidebar";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser.hook";
import AuthContext from "../../contexts/auth/AuthContext";

const ChatLayout = () => {
  const [error, setError] = useState();
  const [currentUser, isLoading] = useAuthenticatedUser({
    onError: (error) => setError(error),
  });

  if (error) {
    console.log('Error ', error)
    return (
      <main className="main">
        <div className="error">{error.message}
        </div>
      </main>
    );
  }
  if (isLoading) {
    return (
      <main className="main">
        <div className="loading">Loading...</div>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="main">
        <div className="">
          Please Login to continue chatting
          <Link to="/auth/login">Login</Link>
        </div>
      </main>
    );
  }

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
