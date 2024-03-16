import React from "react";
import { Link } from "react-router-dom";

import "./profile-card.scss";
import { UserProfileIcon } from "../../../assets";
import { NavLink } from "react-router-dom";
import PenFillIcon from "../../icons/PenFillIcon";

const ProfileCard = ({ user, className }) => {
  return (
    <div className={`profile-card-component ${className}`}>
      <div className="top">
        <img
          src={user.avatarUrl ? user.avatarUrl : UserProfileIcon}
          alt={`${user.username}'s avatar`}
          width={60}
          height={60}
        />
        <div className="bio">
          <span className="name">{user.name ? user.name : "No Name"}</span>
          <span className="username">
            <Link to={`/users/${user.username}`}>@{user.username}</Link>
          </span>
        </div>
        <div className="actions">
          <Link to={`/users/${user.username}?mode=edit`}>
            <PenFillIcon width={32} height={32} />
          </Link>
        </div>
      </div>
      <hr />
      <div className="main">
        
      </div>
    </div>
  );
};

export default ProfileCard;
