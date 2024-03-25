import { useContext } from "react";
import AvatarImg from "../../avatar-img/AvatarImg";
import "./profile-display.scss";
import AuthContext from "../../../contexts/auth/AuthContext";
import XLarge from "../../icons/XLarge";
import { useDispatch } from "react-redux";
import { setContext } from "../../../features/app/app.slice";

const ProfileDisplay = ({ onClose }: { onClose: () => void }) => {
  const { user, logout } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(
      setContext({ contextId: undefined, data: undefined, isGroup: false })
    );
    onClose();
  };

  if (!user) {
    return <></>;
  }

  return (
    <div className="profile-display-component">
      <div className="display-header">
        <h2 className="title">Profile</h2>
        <button className="icon-btn" onClick={onClose}>
          <XLarge width={20} height={20} color="gray" />
        </button>
      </div>
      <div className="display-main profile-bio">
        <AvatarImg
          className="img-avatar"
          src={user.avatarUrl}
          username={user.username}
          name={user.name}
        />
        <div className="bio">
          <div className="username">@{user.username}</div>
          <div className="name">{user.name ? user.name : "No Name"}</div>
          <div className="interests">Hiking | Bike Riding | Quiet Time</div>
        </div>
      </div>

      <div className="bottom">
        <button>Edit Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileDisplay;
