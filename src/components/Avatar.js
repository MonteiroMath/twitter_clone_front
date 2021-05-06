import React, { useState } from "react";
import avatar from "../images/phavatar.png";
import avatar2 from "../images/avatar.png";

function Avatar(props) {
  let [src, setSrc] = useState(avatar2);

  function fallbackSrc(e) {
    setSrc(avatar);
  }

  return (
    <div>
      <img
        className="rounded-circle"
        src={src}
        onError={fallbackSrc}
        alt="like icon"
        width="50px"
        height="50px"
      />
    </div>
  );
}

export default Avatar;
