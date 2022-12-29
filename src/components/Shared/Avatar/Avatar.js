import React, { useState } from "react";
import avatar from "../../../assets/images/phavatar.png";
import avatar2 from "../../../assets/images/avatar.png";

function Avatar(props) {
  let [src, setSrc] = useState(avatar2);

  let size = props.size ? props.size : "50px";

  function fallbackSrc(e) {
    setSrc(avatar);
  }

  return (
    <div>
      <img
        className="rounded-circle"
        src={src}
        onError={fallbackSrc}
        alt="User avatar"
        width={size}
        height={size}
      />
    </div>
  );
}

export default Avatar;
