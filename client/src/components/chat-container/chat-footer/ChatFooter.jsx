import React from "react";
import { useState } from "react";

import "./chat-footer.scss";
import SendFill from "../../icons/SendFill";
import useSocket from "../../../hooks/useSocket";


const ChatFooter = ({ className, context, contextData, currentUser }) => {
  const [chatInput, setChatInput] = useState("");
  const socket = useSocket({
    context,
    authData: context === "groups" ? contextData : currentUser,
  });

  const handleChange = (event) => {
    setChatInput(event.target.value);
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    let newMessage = {
      content: chatInput,
    };
    const to = context === "groups" ? contextData.id : contextData.friend.id

    socket.emit(`/messages/new`, {
      to,
      contextId: contextData.id,
      newMessage,
    });

    setChatInput("");
  };

  return (
    <div className={className} onKeyUp={handleEnterKeyDown}>
      <input className="chat-input" onChange={handleChange} value={chatInput} />
      <button
        className="send-btn"
        onClick={handleSendMessage}
        disabled={chatInput.length <= 0}
      >
        <SendFill
          className={"send-fill-icon"}
          width={28}
          height={28}
          color={"purple"}
        />
      </button>
    </div>
  );
};

export default ChatFooter;
