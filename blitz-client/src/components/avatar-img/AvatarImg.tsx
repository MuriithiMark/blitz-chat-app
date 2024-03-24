import React from "react";

type AvatarImgProps = {
  src?: string;
  alt?: string;
  username?: string;
  name?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
  extraQueryParams?: string
};

const AvatarImg = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  username,
  name,
  extraQueryParams = "background=random",
}: AvatarImgProps) => {
  return (
    <img
      src={
        src
          ? src
          : `https://ui-avatars.com/api/?name=${name ? name : username}${
              extraQueryParams ? `&${extraQueryParams}` : ""
            }`
      }
      alt={alt ? alt : `${username}'s avatar`}
      width={width}
      height={height}
      className={` ${className}`}
      style={style}
    />
  );
};

export default AvatarImg;
