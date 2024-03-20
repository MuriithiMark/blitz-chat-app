import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./header.scss";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser.hook";
import { UserProfileIcon } from "../../../assets";
import ProfileCard from "../../profile/profile-card/ProfileCard";
import BellFill from "../../icons/BellFill";
import { NavLink } from "react-router-dom";
import AvatarImg from "../../profile/avatar-img/AvatarImg";
import NotificationDisplay from "../../notifications/NotificationDisplay";
import ProfileDisplay from "../../profile/profile-display/ProfileDisplay";
import AuthContext from "../../../contexts/auth/AuthContext";

const Header = ({ className }) => {
  const {user, isLoading} = useContext(AuthContext);
  const [profileIsVisble, setProfileIsVisible] = useState(false);
  const [notificationsIsVisible, setNotificationsIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleProfileIconClick = async () => {
    notificationsIsVisible && setNotificationsIsVisible(false);
    profileIsVisble ? setProfileIsVisible(false) : setProfileIsVisible(true);
  };

  const handleNotificationClick = async () => {
    profileIsVisble && setProfileIsVisible(false);
    notificationsIsVisible
      ? setNotificationsIsVisible(false)
      : setNotificationsIsVisible(true);
  };

  const handleLogin = async () => {
    return navigate("/auth/login");
  };

  const handleSignIn = async () => {
    return navigate("/auth/sign-in");
  };

  return (
    <>
      {notificationsIsVisible && (
        <NotificationDisplay onClose={() => setNotificationsIsVisible(false)} />
      )}
      {profileIsVisble && (
        <ProfileDisplay onClose={() => setProfileIsVisible(false)} />
      )}
      <header className={`${className} header-component`}>
        <span className="site-logo">
          <Link to="/">Home</Link>
        </span>
        <nav>
          <NavLink to="/chat">Chat</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/newsfeed">NewsFeed</NavLink>
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
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
