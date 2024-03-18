import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./chat-preview-card.scss";
import AvatarImg from "../../profile/avatar-img/AvatarImg";
import FriendShipStatusAction from "../../actions/friendship-status/FriendShipStatusAction";

const ChatPreviewCard = ({ friend }) => {
  const navigate = useNavigate();

  const handleChatPreviewClick = async () => {
    return navigate(`/chat/${"friends"}/${friend.friendShipId}`);
  };

  return (
    <div
      className="chat-preview-card-component"
      onClick={handleChatPreviewClick}
    >
      <AvatarImg
        src={friend.avatarUrl}
        name={friend.name}
        username={friend.username}
      />
      <div className="bio">
        <Link to={`/user/${friend.username}`} className="username">
          <span>{friend.username}</span>
        </Link>
        <FriendShipStatusAction
          user={friend}
          className={"friendship-actions"}
        />
      </div>
    </div>
  );
};

export default ChatPreviewCard;
