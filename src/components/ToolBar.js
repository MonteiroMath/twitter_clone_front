import React from "react";
import { Row, Col } from "reactstrap";

import TweetButton from "./TweetButton";

import {
  AddImageIcon,
  AddMediaIcon,
  PollIcon,
  EmoticonIcon,
  CalendarIcon,
} from "./svg/Svg";

function ToolBar({ tweetText, emptyTextBox, handleNewTweet }) {
  return (
    <Row className="align-items-center text-info pt-2">
      <Col className="d-flex">
        <div className="mr-3">
          <AddImageIcon />
        </div>

        <div className="mr-3">
          <AddMediaIcon />
        </div>

        <div className="mr-3">
          <PollIcon />
        </div>

        <div className="mr-3">
          <EmoticonIcon />
        </div>

        <div>
          <CalendarIcon />
        </div>
      </Col>

      <Col className="mr-3">
        <TweetButton
          disabled={tweetText == ""}
          handleClick={(evt) => {
            evt.preventDefault();
            handleNewTweet(tweetText);
            emptyTextBox();
          }}
        />
      </Col>
    </Row>
  );
}

export default ToolBar;
