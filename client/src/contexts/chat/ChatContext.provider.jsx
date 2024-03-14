import React, { useEffect, useState } from "react";
import ChatContext from "./ChatContext";
import { getMessagesWithContext } from "../../services/api/messages.api";

function ChatContextProvider({ children }) {
  const [chat, setChat] = useState();

  const onChatSelect = ({ context, data }) => {
    // find that data in localstorage
    setChat({ context, data, messages: [] });
  };

  const onChatLeave = () => {
    setChat(null);
  };

  const onFetchMessages = () => {
    
  };

  return (
    <ChatContext.Provider value={{ chat, onChatSelect, onChatLeave }}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
