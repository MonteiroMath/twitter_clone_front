import React, { useState } from "react";

import AttachButton from "./Buttons/AttachButton";
import AddMediaButton from "./Buttons/AddMediaButton";
import PollButton from "./Buttons/PollButton.js";

import { EmoticonIcon, CalendarIcon } from "../../../Svg/Svg";

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
        <AttachButton
          handleAttach={handleAttach}
          block={block}
          toggle={toggle}
          tooltipOpen={tooltipOpen.img}
        />
      </div>
      <div className="mr-3">
        <AddMediaButton
          handleAttach={handleAttach}
          block={block}
          toggle={toggle}
          tooltipOpen={tooltipOpen.gif}
        />
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
