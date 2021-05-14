import React from "react";
import { Row, Col, Button } from "reactstrap";

import LeftNavBar from "./LeftNavBar";

function LeftBar(props) {
  return (
    <Col className="d-none d-md-block pt-1" md="2" lg="3">
      <Row className="justify-content-end justify-content-lg-center" noGutters>
        <LeftNavBar />
      </Row>

      <Row className="justify-content-center mt-5">profile info</Row>
    </Col>
  );
}

export default LeftBar;
