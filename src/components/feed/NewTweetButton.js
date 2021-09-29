import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import { PenIcon } from "../svg/Svg";

function NewTweetButton({ handleNewTweet }) {
  return (
    <Button
      className="d-sm-none cstickyButton"
      color="info"
      onClick={handleNewTweet}
    >
      <div>
        <Link className="text-white" to="/compose">
          <PenIcon />
        </Link>
      </div>
    </Button>
  );
}

export default NewTweetButton;
