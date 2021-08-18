import React from "react";
import { Button } from "reactstrap";

function TweetButton({ handleClick }) {
  return (
    <Button className="croundSides px-4" color="info" onClick={handleClick}>
      <span>Tweet</span>
    </Button>
  );
}

export default TweetButton;
