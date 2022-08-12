import React from "react";

import { Input, Label, Tooltip } from "reactstrap";
import { AddMediaIcon } from "../Svg/Svg";

function AddMediaButton({ handleAttach, block, toggle, tooltipOpen }) {
  return (
    <div>
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
  );
}

export default AddMediaButton;
