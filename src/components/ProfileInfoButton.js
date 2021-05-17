import React from "react";
import { Row, Col, Button } from "reactstrap";

import Avatar from "./Avatar";

function ProfileInfoButton(props) {
  return (
    <Button color="white">
      <Row noGutters>
        <Col>
          <Avatar size="35px" />
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
