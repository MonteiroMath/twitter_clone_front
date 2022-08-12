import React from "react";
import { Row, Col, Button } from "reactstrap";

import Avatar from "../Shared/Avatar/Avatar";

function ProfileInfoButton(props) {
  return (
    <Button className="p-0" color="white">
      <Row noGutters>
        <Col>
          <Avatar size="45px" />
        </Col>
        <Col className="d-none d-lg-block">
          <div className="ml-3 text-left">
            <div className="cfw-bolder">Username</div>
            <div className="text-secondary">@Username</div>
          </div>
        </Col>
      </Row>
    </Button>
  );
}

export default ProfileInfoButton;
