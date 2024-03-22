import React, { useState } from "react";

import avatarph from "../../../assets/images/avatar-placeholder.gif";

function Avatar(props) {
  let { context = "default", avatar } = props;
  let [src, setSrc] = useState(avatar || avatarph);

  function fallbackSrc(e) {
    setSrc(avatarph);
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
