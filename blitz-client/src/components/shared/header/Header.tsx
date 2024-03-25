import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./header.scss";
import { Link } from "react-router-dom";
import AuthContext from "../../../contexts/auth/AuthContext";
import {
  toggleLogin,
  toggleRegister,
} from "../../../features/modals/modal.slice";
import AvatarImg from "../../avatar-img/AvatarImg";
import FullScreenOverlay from "../../overlay/full-screen-overlay/FullScreenOverlay";
import ProfileDisplay from "../../profile/profile-display/ProfileDisplay";
import NotificationsDisplay from "../../notifications/notifications-display/NotificationsDisplay";
import { RootState } from "../../../features/store";
import BellFill from "../../icons/BellFill";
import BellSlash from "../../icons/BellSlash";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const [notificationsIsOpen, setNotificationsIsOpen] = useState(false);
  const notifications = useSelector((state: RootState) => state.notifications);
  const dispatch = useDispatch();

  const login = async () => {
    dispatch(toggleLogin());
  };

  const register = async () => {
    dispatch(toggleRegister());
  };

  const toggleProfile = async () => {
    setProfileIsOpen(!profileIsOpen);
    setNotificationsIsOpen(false);
  };
  const toggleNotifications = async () => {
    setNotificationsIsOpen(!notificationsIsOpen);
    setProfileIsOpen(false);
  };

  return (
    <>
      {profileIsOpen && (
        <FullScreenOverlay
          className="overlay"
          onClick={toggleProfile}
          wrapperClassName="overlay-child-component"
        >
          <ProfileDisplay onClose={toggleProfile} />
        </FullScreenOverlay>
      )}
      {notificationsIsOpen && (
        <FullScreenOverlay
          className="overlay"
          onClick={toggleNotifications}
          wrapperClassName="overlay-child-component"
        >
          <NotificationsDisplay onClose={toggleNotifications} />
        </FullScreenOverlay>
      )}
      <header>
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="logo-span">blitz</span>
          </Link>
        </div>
        <nav className="nav"></nav>
        <div className="header-actions">
          {user ? (
            <div className="user-status logged-in">
              <div className="notifications">
                <button className="icon-btn" onClick={toggleNotifications}>
                  {notifications.length > 0 ? (
                    <>
                      <BellFill width={20} height={20} color="gray" />
                      <span className="notification-count">
                        {notifications.length}
                      </span>
                    </>
                  ) : (
                    <BellSlash width={20} height={20} color="gray" />
                  )}
                </button>
              </div>
              <div className="account-profile">
                <button
                  className="btn btn-icon btn-profile"
                  onClick={toggleProfile}
                >
                  <AvatarImg
                    className="img-avatar"
                    username={user?.username}
                    src={user?.avatarUrl}
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className="user-status logged-out">
              <div className="login">
                <button className="btn login-btn" onClick={login}>
                  Login
                </button>
              </div>
              <div className="sign-in">
                <button className="btn sign-in-btn" onClick={register}>
                  Sign in
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
