import React from "react";

import "./loading-overlay.scss";

const LoadingOverlay = ({
  isLoading = false,
  loadingComponent,
  children,
  className = "",
  loadingStyles = "",
}) => {
  return (
    <div className={`loading-overlay ${className}`}>
      {isLoading && (
        <div className={`loading-component ${loadingStyles}`}>
          {loadingComponent}
        </div>
      )}
      {/* <div className={`main-component ${mainStyles}`}> */}
      {children}
      {/* </div> */}
    </div>
  );
};

export default LoadingOverlay;
