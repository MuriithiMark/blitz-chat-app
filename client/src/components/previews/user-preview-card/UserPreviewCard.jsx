import React from "react";
import { Link } from "react-router-dom";

import "./user-preview-card.scss";
import FriendShipStatusAction from "../../actions/friendship-status/FriendShipStatusAction";
import { UserProfileIcon } from "../../../assets";

const UserPreviewCard = ({ user }) => {
  return (
    <div className={`user-preview-card`}>
      <img
        src={
          user.avatarUrl
            ? user.avatarUrl
            : `https://ui-avatars.com/api/?name=${user.name ?? user.username}`
        }
        alt={`${user.username + "'s"} avatar`}
      />
      <div className="bio">
        <Link to={`/user/${user.username}`}>
          <span className="username">{user.username}</span>
        </Link>
        {true ? (
          <FriendShipStatusAction user={user} />
        ) : (
          <span>No Friends Available</span>
        )}
      </div>
    </div>
  );
};

export default UserPreviewCard;
