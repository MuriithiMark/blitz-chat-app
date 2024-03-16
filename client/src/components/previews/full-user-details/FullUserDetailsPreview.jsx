import React from "react";

import "./full-user-details-preview.scss";

const FullUserDetailsPreview = ({ className, user }) => {
  return (
    <div className={`${className} full-user-details-preview-bio`}>
      <div className="bio">
        <img src={user.avatarUrl} alt={user.name} />
        <div className="about">
          <span className="name">{user.name ? user.name : "No Name"}</span>
          <span className="username">@{user.username}</span>
        </div>
      </div>
      <hr style={{ height: '.1em', width: '100%'}} />
    </div>
  );
};

export default FullUserDetailsPreview;
