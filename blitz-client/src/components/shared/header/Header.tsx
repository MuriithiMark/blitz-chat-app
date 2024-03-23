import Reat, { useContext } from "react";

import "./header.scss";
import { Link } from "react-router-dom";
import AuthContext from "../../../contexts/auth/AuthContext";
import { useDispatch } from "react-redux";
import {
  toggleLogin,
  toggleRegister,
} from "../../../features/modals/modal.slice";
import AvatarImg from "../../avatar-img/AvatarImg";

const Header = () => {
  const { user, isLoading } = useContext(AuthContext);
  const dispatch = useDispatch();

  const login = async () => {
    dispatch(toggleLogin());
  };

  const register = async () => {
    dispatch(toggleRegister());
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">Home</Link>
      </div>
      <nav className="nav"></nav>
      <div className="header-actions">
        {user ? (
          <div className="user-status logged-in">
            <div className="notifications">
              <button className="btn btn-icon btn-notifications">
                Notifications
              </button>
            </div>
            <div className="account-profile">
              <button className="btn btn-icon btn-profile">
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
  );
};

export default Header;
