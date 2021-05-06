import React from "react";
import avatar from "../images/phavatar.png";

function Avatar(props) {
  return (
    <div className="pt-3">
      <img src={avatar} alt="like icon" width="50px" />
    </div>
  );
}

export default Avatar;
