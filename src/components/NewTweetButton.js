import React from "react";
import { Button } from "reactstrap";
import feather from "../icons/feather.svg";

function NewTweetButton(props) {
  return (
    <Button className="d-sm-none stickyButton" color="info">
      <div>
        <img src={feather} alt="new tweet icon" width="30px" />
      </div>
    </Button>
  );
}

export default NewTweetButton;
