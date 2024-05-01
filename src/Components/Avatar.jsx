import React from "react";
import ReactAvatar from "react-avatar";

const Avatar = ({ name, size, ...props }) => {
  return <ReactAvatar name={name} size={size} round={"99px"} {...props} />;
};

export default Avatar;
