import React, { useState } from "react";
import avatar from "../../../assets/images/phavatar.png";
import avatar2 from "../../../assets/images/avatar.png";

function Avatar(props) {
  let { context = "default" } = props;
  let [src, setSrc] = useState(avatar2);

  function fallbackSrc(e) {
    setSrc(avatar);
  }

  return (
    <img
      className={`rounded-circle avatarContext-${context}`}
      src={src}
      onError={fallbackSrc}
      alt="User avatar"
    />
  );
}

export default Avatar;
