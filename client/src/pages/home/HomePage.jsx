import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./home-page.scss";
import ChatContainer from "../../components/chat-container/ChatContainer";
import useAuthenticatedUser from "../../hooks/use-authenticated-user.hook";

function HomePage() {

  useEffect(() => {
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="home-page">
      <ChatContainer />
    </div>
  );
}

export default HomePage;
