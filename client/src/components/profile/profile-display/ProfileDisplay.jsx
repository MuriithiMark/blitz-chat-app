import React from "react";

import "./profile-display.scss";
import FullScreenOverlay from "../../overlays/full-screen-overlay/FullScreenOverlay";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser.hook";
import AvatarImg from "../avatar-img/AvatarImg";
import { useNavigate } from "react-router-dom";
import PenFillIcon from "../../icons/PenFillIcon";
import CancelXIcon from "../../icons/CancelXIcon";

const ProfileDisplay = ({ onClose }) => {
  const [currentUser] = useAuthenticatedUser();
  const navigate = useNavigate();

  return (
    <FullScreenOverlay className={`overlay`} onClick={onClose}>
      <div
        className="profile-display-component"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="profile-display-header">
          <button className="edit-btn">
            <PenFillIcon width={24} height={24} />
          </button>
          <span className="title">Profile</span>
          <button onClick={onClose} className="cancel-btn">
            <CancelXIcon width={24} height={24} color="gray" />
          </button>
        </div>
        <div className="profile-display-image">
          <AvatarImg
            src={currentUser.avatarUrl}
            username={currentUser.username}
            name={currentUser.name}
            width={160}
            height={160}
            extraQueryParams="bold=true&size=160"
          />
        </div>
        <div className="profile-display-bio">
          <span
            className="username"
            onClick={() => navigate(`/users/${currentUser.username}`)}
          >
            @{currentUser.username}
          </span>
        </div>
        <div className="profile-display-details">
          <span>10 Friends</span>
          <span>10 Posts</span>
          <span>20 Notifications</span>
        </div>
      </div>
    </FullScreenOverlay>
  );
};

export default ProfileDisplay;
