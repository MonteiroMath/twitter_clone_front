import React from "react";
import { Row, Col } from "reactstrap";
import Avatar from "../Shared/Avatar/Avatar";
import FollowButton from "../FollowButton";

function WtF_Section(props) {
  const { name } = props.content;

  return (
    <a href="/#">
      <Row className="border-bottom p-2 align-items-center" noGutters>
        <Col lg="2">
          <Avatar />
        </Col>
        <Col className="text-truncate ml-3" lg="6">
          <div className="text-dark cfw-bolder">{name}</div>
          <div className="cfs-small text-black-50">{"@" + name}</div>
        </Col>
        <Col xs="2" className="ml-auto mr-3">
          <FollowButton />
        </Col>
      </Row>
    </a>
  );
}

export default WtF_Section;
