import React from "react";

import "./full-screen-overlay.scss";

const FullScreenOverlay = ({ style, className, onClick, children }) => {
  return (
    <div
      className={`full-screen-overlay-component ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FullScreenOverlay;
