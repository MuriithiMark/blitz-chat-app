import React from "react";

import './avatar-img.scss';

const AvatarImg = ({
  src,
  name,
  username,
  width,
  height,
  className,
  style,
}) => {
  return (
    <img
      src={src ? src : `https://ui-avatars.com/api/?name=${name ?? username}`}
      alt={`${username}'s avatar`}
      width={width}
      height={height}
      className={`avatar-img-component ${className}`}
      style={style}
    />
  );
};

export default AvatarImg;
