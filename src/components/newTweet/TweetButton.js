import React from "react";
import { Button } from "reactstrap";

function TweetButton({ handleClick, disabled }) {
  return (
    <Button
      className="croundSides px-4"
      disabled={disabled}
      color="info"
      onClick={handleClick}
    >
      Tweet
    </Button>
  );
}

export default TweetButton;
