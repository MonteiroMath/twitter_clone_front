import React from "react";
import { Button, Row, Col } from "reactstrap";
import phavatar from "../images/phavatar.png";
import Avatar from "./Avatar";

function WtF_Section(props) {
  const { name } = props.content;

  return (
    <a href="#">
      <Row className="border-bottom p-2" noGutters>
        <Col lg="2">
          <Avatar />
        </Col>
        <Col className="text-truncate ml-3" lg="6">
          <div className="text-dark cfw-bolder">{name}</div>
          <div className="cfs-small text-black-50">{"@" + name}</div>
        </Col>
        <div className="ml-auto">
          <Button color="info" size="sm" outline rounded>
            Follow
          </Button>
        </div>
      </Row>
    </a>
  );
}

export default WtF_Section;
