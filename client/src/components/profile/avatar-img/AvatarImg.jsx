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
  alt,
  extraQueryParams
}) => {
  return (
    <img
      src={src ? src : `https://ui-avatars.com/api/?name=${name ? name : username}&${extraQueryParams ? extraQueryParams : ''}`}
      alt={alt ?? `${username}'s avatar`}
      width={width}
      height={height}
      className={`avatar-img-component ${className}`}
      style={style}
    />
  );
};

export default AvatarImg;
