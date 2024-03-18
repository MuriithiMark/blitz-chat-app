import React from "react";
import { useState } from "react";

import "./chat-footer.scss";
import SendFill from "../../icons/SendFill";
import { chatSocket } from "../../../services/socket";
import { useSelector } from "react-redux";

const ChatFooter = ({ className, context, contentData, socket }) => {
  const [chatInput, setChatInput] = useState("");

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

    if (true /**handle group/friend */) {
      console.error('Handle Sending Messages')
      return
    }

    socket.emit(`${context}/messages/new`, {
      to: contextData.id,
      friendShipId: contextData.friendShipId,
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
