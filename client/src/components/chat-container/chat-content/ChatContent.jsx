import React from 'react'
import { useSelector } from 'react-redux';

const ChatContent = ({className}) => {
  const messages = useSelector((state) => state.chatContainer.messages);

  return (
    <div className={className}>ChatContent</div>
  )
}

export default ChatContent