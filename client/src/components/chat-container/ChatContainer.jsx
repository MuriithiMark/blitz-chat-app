import React from 'react'

import "./chat-container.scss";
import ChatHeader from './chat-header/ChatHeader';
import ChatFooter from './chat-footer/ChatFooter';
import ChatContent from './chat-content/ChatContent';

const ChatContainer = () => {
  return (
    <div className='chat-container'>
        <ChatHeader className="chat-header" />
        <ChatContent className="chat-content" />
        <ChatFooter className="chat-footer" />
    </div>
  )
}

export default ChatContainer