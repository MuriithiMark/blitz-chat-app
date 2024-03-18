import React from "react";

import "./message-card.scss";

const MessageCard = ({ message, context, currentUserId }) => {
  return (
    <div className="container">
      <div
        className={`message-holder ${
          currentUserId === message.senderId ? "right" : "left"
        }`}
      >
        {context === "groups" && (
          <div className="message-header">
            <span>{message.senderId}</span>
          </div>
        )}
        <span className="message-text-container">{message.content}</span>
        <span className="message-time-container">
          {Intl.DateTimeFormat("en", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(message.createdAt))}
        </span>
      </div>
    </div>
  );
};

export default MessageCard;
