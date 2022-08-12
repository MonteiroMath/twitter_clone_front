import React from "react";

import { Button } from "reactstrap";

import { ShareIcon } from "../../../../../svg/Svg.js";

export default function ShareButton(props) {
  return (
    <div className="d-flex align-items-center">
      <Button
        aria-label="Share tweet"
        className="p-1 cnoBorder"
        color="info"
        outline
      >
        <ShareIcon />
      </Button>
    </div>
  );
}
