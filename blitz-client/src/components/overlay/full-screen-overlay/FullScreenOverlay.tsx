import React from "react";
import "./full-screen-overlay.scss";

type FullScreenOverlayProps = {
  className?: string;
  wrapperClassName?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
};

const FullScreenOverlay = ({
  className,
  wrapperClassName,
  style,
  onClick,
  children,
}: FullScreenOverlayProps) => {
  return (
    <div
      className={`full-screen-overlay-component ${className}`}
      style={style}
      onClick={onClick}
    >
      <div
        className={wrapperClassName}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default FullScreenOverlay;
