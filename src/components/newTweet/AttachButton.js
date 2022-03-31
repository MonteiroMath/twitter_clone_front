import React from "react";
import { Input, Label, Tooltip } from "reactstrap";
import { AddImageIcon } from "../svg/Svg";

function AttachButton({ handleAttach, block, toggle, tooltipOpen }) {
  return (
    <div>
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
        isOpen={tooltipOpen}
        target="imgAttachLabel"
        toggle={() => toggle("img")}
      >
        Image
      </Tooltip>
    </div>
  );
}

export default AttachButton;
