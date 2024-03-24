import { useSelector } from "react-redux";
import XLarge from "../../icons/XLarge";
import "./notifications-display.scss";
import { RootState } from "../../../features/store";

const NotificationsDisplay = ({ onClose }: { onClose: () => void }) => {
  const notifications = useSelector((state: RootState) => state.notifications);

  return (
    <div className="notifications-display-component">
      <div className="display-header">
        <h2 className="title">Notifications</h2>
        <button className="icon-btn" onClick={onClose}>
          <XLarge width={20} height={20} color="gray" />
        </button>
      </div>
      <div className="notifications-list">
        {!notifications.length && <span>No Notifications</span>}
        {notifications.map((notification) => (
          <div key={notification.id}>{notification.id}</div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsDisplay;
