import React from "react";
import { Button } from "reactstrap";

function TweetButton(props) {
  return (
    <Button className="croundSides px-4" color="info">
      <span>Tweet</span>
    </Button>
  );
}

export default TweetButton;
