import React from "react";

/* */
import Avatar0 from "../assets/Avatars/spiritedaway.svg";
import Avatar1 from "../assets/Avatars/zombie.svg";
import Avatar2 from "../assets/Avatars/breakingbad.svg";
import Avatar3 from "../assets/Avatars/fridayjason.svg";
import Avatar4 from "../assets/Avatars/batman.svg";

const AvatarImg = ({ no, style, ...props }) => {
  const avatarSrc =
    no == 0
      ? Avatar0
      : no == 1
      ? Avatar1
      : no == 2
      ? Avatar2
      : no == 3
      ? Avatar3
      : Avatar4;
  return (
    <img
      src={avatarSrc}
      {...props}
      style={{
        objectFit: "cover",
        borderRadius: 99,
        ...style,
      }}
    />
  );
};

export default AvatarImg;
