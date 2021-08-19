import React from "react";
import { Row, Col, Input, Label } from "reactstrap";

import TweetButton from "./TweetButton";

import {
  AddImageIcon,
  AddMediaIcon,
  PollIcon,
  EmoticonIcon,
  CalendarIcon,
} from "./svg/Svg";

function ToolBar({
  tweetText,
  clearForm,
  handleNewTweet,
  attach,
  handleAttach,
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
      <Col className="d-flex">
        <div className="mr-3">
          <Label className="cpointer" for="imgAttach">
            <AddImageIcon />
          </Label>
          <Input
            type="file"
            id="imgAttach"
            name="imgAttach"
            accept="image/png, image/jpeg"
            onChange={handleAttach}
          />
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
