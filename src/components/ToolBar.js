import React, { useState } from "react";
import { Row, Col, Input, Label, Tooltip, Button } from "reactstrap";

import UtilitiesBar from "./UtilitiesBar";
import TweetButton from "./TweetButton";

//todo figure out gif attachment
//todo turn ToolBar into a display component only. Move up isDisabled and handleClick to FormControl

function ToolBar({
  tweetText,
  clearForm,
  handleNewTweet,
  attach,
  handleAttach,
  block,
  handlePoll,
}) {
  function isDisabled(tweetText, attach) {
    if (
      (tweetText.trim().length === 0 || tweetText.trim().length > 280) &&
      attach === ""
    )
      return true;

    return false;
  }

  return (
    <Row className="align-items-center text-info pt-2" noGutters={true}>
      <Col>
        <UtilitiesBar
          handleAttach={handleAttach}
          handlePoll={handlePoll}
          block={block}
        />
      </Col>

      <Col className="d-flex justify-content-end mr-3">
        <TweetButton
          disabled={isDisabled(tweetText, attach)}
          handleClick={(evt) => {
            evt.preventDefault();
            handleNewTweet({
              message: tweetText,
              attach: attach,
            });
            clearForm();
          }}
        />
      </Col>
    </Row>
  );
}

export default ToolBar;
