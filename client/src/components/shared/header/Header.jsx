import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./header.scss";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser.hook";
import { UserProfileIcon } from "../../../assets";
import ProfileCard from "../../profile/profile-card/ProfileCard";
import BellFill from "../../icons/BellFill";

const Header = ({ className }) => {
  const [user, isLoading] = useAuthenticatedUser();
  const [profileIsVisble, setProfileIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleProfileIconClick = async () => {
    console.log(data);
    return navigate(`/users/${user.username}`);
  };

  const handleNotificationClick = async () => {
    return navigate(`/users/${user.username}/notifications`);
  };

  const handleLogin = async () => {
    return navigate("/auth/login");
  };

  const handleSignIn = async () => {
    return navigate("/auth/sign-in");
  };

  return (
    <header className={`${className} header-component`}>
      <span className="site-logo">
        <Link to="/">Home</Link>
      </span>
      <nav></nav>
      <div className="settings">
        {isLoading || !user ? (
          <>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignIn}>Sign In</button>
          </>
        ) : (
          <>
            <button
              className="notifications-btn"
              onClick={handleNotificationClick}
            >
              <div className="notifications-bell-component">
                <BellFill width={32} height={32} />
              </div>
            </button>
            <button onClick={handleProfileIconClick}>
              <img
                className="profile-icon"
                src={user.avatarUrl ? user.avatarUrl : UserProfileIcon}
                width={40}
                height={40}
                alt={`${user.username}'s avatar`}
              />
            </button>
            {profileIsVisble && <ProfileCard user={user} />}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
