import React from "react";
import { Button, Tooltip } from "reactstrap";

import { PollIcon } from "../../../Svg/Svg";

function PollButton({ handlePoll, block, tooltipOpen, toggle }) {
  return (
    <div className="mr-3">
      <Button
        aria-label="add poll"
        className="cpointer cutitilyBarDisable p-0 cnoBorder"
        color="info"
        outline={true}
        id="pollButton"
        onClick={handlePoll}
        disabled={block}
      >
        <PollIcon />
      </Button>
      <Tooltip
        placement="right"
        isOpen={tooltipOpen}
        target="pollButton"
        toggle={() => toggle("poll")}
      >
        Poll
      </Tooltip>
    </div>
  );
}

export default PollButton;
