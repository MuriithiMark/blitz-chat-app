import React from "react";
import { useSelector } from "react-redux";

import "./chat-header.scss";
import ThreeDotFill from "../../icons/ThreeDotFill";

const ChatHeader = ({ className }) => {
  const data = useSelector((state) => state.chatContainer.data);
  const currentUser = useSelector((state) => state.auth.user);

  const handleChatSettings = () => {
    console.log("Settings Clicked ", data);
  };

  const chatDisplayName =
    data.id === currentUser.id ? "You" : !data.name ? data.username : data.name;

  return (
    <div className={className}>
      <img
        className="profile-img"
        src={data.avatarUrl}
        alt={`${data.username} avatar`}
      />
      <div className="chat-details">
        <span className="name">{chatDisplayName}</span>
        <span className="last-seen">Last Seen 5 days ago</span>
      </div>
      <div className="chat-settings">
        <button onClick={handleChatSettings}>
          <ThreeDotFill width={16} height={16} color={"black"} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
