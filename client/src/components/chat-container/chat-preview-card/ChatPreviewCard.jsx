import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./chat-preview-card.scss";
import AvatarImg from "../../profile/avatar-img/AvatarImg";
import FriendShipStatusAction from "../../actions/friendship-status/FriendShipStatusAction";

const ChatPreviewCard = ({ friend }) => {

  const navigate = useNavigate();

  const handleChatPreviewClick = async () => {
    return navigate(`/chat/${'friend'}/${friend.friendShipId}`)
  }

  return (
    <div className="chat-preview-card-component" onClick={handleChatPreviewClick}>
      <AvatarImg
        src={friend.avatarUrl}
        name={friend.name}
        username={friend.username}
      />
      <div className="bio">
        {/* <span className="name">{friend.name ? friend.name : "No Name"}</span> */}
        <Link to={`/user/${friend.username}`} className="username">
          <span>{friend.username}</span>
        </Link>
        <div>
          <FriendShipStatusAction user={friend} />
        </div>
      </div>
    </div>
  );
};

export default ChatPreviewCard;
