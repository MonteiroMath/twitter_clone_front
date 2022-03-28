import React from "react";
import { Row, Col } from "reactstrap";

import UtilitiesBar from "./UtilitiesBar";
import TweetButton from "./TweetButton";

//todo figure out gif attachment

function ToolBar({
  handleAttach,
  block,
  handlePoll,
  isDisabled,
  handleSubmit,
  noPoll,
}) {
  return (
    <Row className="align-items-center text-info pt-2" noGutters={true}>
      <Col>
        <UtilitiesBar
          block={block}
          handleAttach={handleAttach}
          handlePoll={handlePoll}
          noPoll={noPoll}
        />
      </Col>

      <Col className="d-flex justify-content-end mr-3">
        <TweetButton disabled={isDisabled()} handleClick={handleSubmit} />
      </Col>
    </Row>
  );
}

export default ToolBar;
