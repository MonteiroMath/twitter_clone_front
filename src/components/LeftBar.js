import React from "react";
import { Row, Col } from "reactstrap";

import LeftNavBar from "./LeftNavBar";
import ProfileInfoButton from "./ProfileInfoButton";

function LeftBar(props) {
  return (
    <Col className="d-none d-md-block pt-1 fixed-top" md="2" lg="3">
      <Row className="justify-content-end justify-content-lg-center" noGutters>
        <LeftNavBar />
      </Row>

      <Row className="justify-content-center mt-5">
        <ProfileInfoButton />
      </Row>
    </Col>
  );
}

export default LeftBar;
