import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./home-page.scss";
import ChatContainer from "../../components/chat-container/ChatContainer";
import { createTab } from "../../features/tabs/tabs.slice";

function HomePage() {

  useEffect(() => {
    /**
     * @type {{name: string, isActive: boolean}[]}
     */
    const tabs = [
      {
        name: "HomePageTabs/chat",
        isActive: false,
      },
      {
        name: "HomePageTabs/newsfeed",
        isActive: true,
      },
    ];

    tabs.forEach((tab) => {
      console.log(tab);
      dispatch(createTab(tab));
    });
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="home-page">
      <ChatContainer />
    </div>
  );
}

export default HomePage;
