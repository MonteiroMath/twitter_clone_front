import React from "react";

import { Button } from "reactstrap";

import image from "../icons/image.svg";
import poll from "../icons/pool.svg";
import emoji from "../icons/emoji.svg";
import schedule from "../icons/schedule.svg";
import gif from "../icons/gif.svg";

function ToolBar(props) {
  return (
    <div>
      <div className="d-flex pt-2">
        <div className="mr-3">
          <img src={image} alt="add icon" width="15px" />
        </div>
        <div className="mr-3">
          <img src={gif} alt="gif icon" width="15px" />
        </div>
        <div className="mr-3">
          <img src={poll} alt="poll icon" width="15px" />
        </div>
        <div className="mr-3">
          <img src={emoji} alt="emoji icon" width="15px" />
        </div>
        <div>
          <img src={schedule} alt="schedule icon" width="15px" />
        </div>

        <Button className="ml-auto mr-4 round" color="info">
          Tweet
        </Button>
      </div>
    </div>
  );
}

export default ToolBar;
