import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./header.scss";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser.hook";
import { UserProfileIcon } from "../../../assets";
import ProfileCard from "../../profile/profile-card/ProfileCard";
import BellFill from "../../icons/BellFill";
import { NavLink } from "react-router-dom";
import AvatarImg from "../../profile/avatar-img/AvatarImg";

const Header = ({ className }) => {
  const [user, isLoading] = useAuthenticatedUser();
  const [profileIsVisble, setProfileIsVisible] = useState(false);
  const [notificationsIsVisible, setNotificationsIsVisible] = useState(false)
  const navigate = useNavigate();

  const handleProfileIconClick = async () => {
    console.log(data);
    // return navigate(`/users/${user.username}`);
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
      <nav>
        <NavLink to="/chat">Chat</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
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
                {notificationsIsVisible && <div></div>}
              </div>
            </button>
            <button onClick={handleProfileIconClick}>
              <AvatarImg
                className="profile-icon"
                src={user.avatarUrl}
                width={40}
                height={40}
                name={user.name}
                username={user.username}
              />
              {profileIsVisble && <div></div>}
            </button>
            {profileIsVisble && <ProfileCard user={user} />}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
