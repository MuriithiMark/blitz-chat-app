import React from "react";
import { useState } from "react";

import "./chat-footer.scss";
import SendFill from "../../icons/SendFill";
import { chatSocket } from "../../../services/socket";
import { useSelector } from "react-redux";


const ChatFooter = ({ className }) => {
  const context = useSelector((state) => state.chatContainer.context);
  const contextData = useSelector((state) => state.chatContainer.data);

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
    const newMessage = {
      content: chatInput,
    };

    if (context === "user") {  
      chatSocket.emit("new", {
        to: contextData.id,
        friendShipId: contextData.friendShipId,
        newMessage,
      });
    }

    if (context === "group") {
      console.log("Group Context");
    }

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
