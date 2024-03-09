import React from "react";
import { useState } from "react";

import "./chat-footer.scss";
import RichTextInput from "../../input/RichTextInput";
import SendFill from "../../icons/SendFill";

const ChatFooter = ({ className }) => {
  const [chatInput, setChatInput] = useState("<h1>Hello World</h1>");

  /**
   *
   * @param {string} content
   */
  const handleChange = (content) => {
    setChatInput(content);
  };

  /**
   * 
   * @param {React.KeyboardEvent<HTMLDivElement>} event 
   */
  const handleEnterKeyDown = (event) => {
    if(event.key === "Enter") {
       handleSendMessage() 
    }
  }

  const handleSendMessage = () => {
    console.log('Content ', chatInput)
  }

  return (
    <div className={className} onKeyUp={handleEnterKeyDown}>
      <RichTextInput className="chat-input" onChange={handleChange} />
      <button className="send-btn" onClick={handleSendMessage}>
        <SendFill className={"send-fill-icon"} width={28} height={28} color={"purple"} />
      </button>
    </div>
  );
};

export default ChatFooter;
