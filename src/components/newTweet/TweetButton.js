import React from "react";
import { Button } from "reactstrap";

function TweetButton({ handleClick, disabled, btn_text }) {
  return (
    <Button
      className="croundSides px-4"
      disabled={disabled}
      color="info"
      onClick={handleClick}
    >
      {btn_text}
    </Button>
  );
}

export default TweetButton;
