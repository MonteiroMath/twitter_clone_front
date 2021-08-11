import React from "react";
import { Row, Col } from "reactstrap";

import FollowButton from "../FollowButton";

function TopicSection(props) {
  const { topic, genre } = props.content;

  return (
    <a href="/#">
      <Row className="border-bottom p-2 align-items-center" noGutters>
        <Col>
          <div className="text-dark cfw-bolder">{topic}</div>
          <div className="cfs-small text-black-50">{genre}</div>
        </Col>
        <Col xs="2" className="ml-auto mr-3">
          <FollowButton />
        </Col>
      </Row>
    </a>
  );
}

export default TopicSection;
