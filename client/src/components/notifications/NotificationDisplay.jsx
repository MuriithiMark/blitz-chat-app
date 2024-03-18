import React from "react";
import FullScreenOverlay from "../overlays/full-screen-overlay/FullScreenOverlay";

const NotificationDisplay = () => {
  return (
    <FullScreenOverlay className='overlay'>
      <div className="notification-display-component">NotificationDisplay</div>
    </FullScreenOverlay>
  );
};

export default NotificationDisplay;
