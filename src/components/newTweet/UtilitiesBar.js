import React, { useState } from "react";
import { Input, Label, Tooltip } from "reactstrap";

import {
  AddImageIcon,
  AddMediaIcon,
  EmoticonIcon,
  CalendarIcon,
} from "../svg/Svg";
import PollButton from "./PollButton.js";

function UtilitiesBar(props) {
  const { handleAttach, handlePoll, block, noPoll } = props;

  const [tooltipOpen, setTooltipOpen] = useState({
    img: false,
    gif: false,
    poll: false,
  });

  const toggle = (field) => {
    setTooltipOpen({ ...tooltipOpen, [field]: !tooltipOpen[field] });
  };

  return (
    <div className="d-flex">
      <div className="mr-3">
        <Input
          className="cutitilyBarDisable"
          type="file"
          id="imgAttach"
          data-testid="imgAttach"
          name="imgAttach"
          accept="image/png, image/jpeg"
          onChange={handleAttach}
          disabled={block}
        />
        <Label className="cpointer" id="imgAttachLabel" for="imgAttach">
          <AddImageIcon />
        </Label>
        <Tooltip
          placement="right"
          isOpen={tooltipOpen.img}
          target="imgAttachLabel"
          toggle={() => toggle("img")}
        >
          Image
        </Tooltip>
      </div>
      <div className="mr-3">
        <Input
          className="cutitilyBarDisable"
          type="file"
          id="gifAttach"
          name="gifAttach"
          accept="image/gif"
          onChange={handleAttach}
          disabled={block}
        />
        <Label
          className="cpointer cutitilyBarDisable"
          id="gifAttachLabel"
          for="gifAttach"
        >
          <AddMediaIcon />
        </Label>
        <Tooltip
          placement="right"
          isOpen={tooltipOpen.gif}
          target="gifAttachLabel"
          toggle={() => toggle("gif")}
        >
          GIF
        </Tooltip>
      </div>
      {!noPoll && (
        <PollButton
          handlePoll={handlePoll}
          block={block}
          tooltipOpen={tooltipOpen.poll}
          toggle={() => toggle("poll")}
        />
      )}
      <div className="mr-3">
        <EmoticonIcon />
      </div>
      <div>
        <CalendarIcon />
      </div>
    </div>
  );
}

export default UtilitiesBar;
