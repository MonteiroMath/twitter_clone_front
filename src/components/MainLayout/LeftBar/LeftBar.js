import React from "react";
import { Row, Col } from "reactstrap";

import LeftNavBar from "./LeftNavBar/LeftNavBar";
import ProfileInfoButton from "./ProfileInfoButton/ProfileInfoButton";
import SidebarTweetButton from "./SidebarTweetButton/SidebarTweetButton";

function LeftBar() {
  return (
    <div
      className="c-vp-height d-flex flex-column justify-content-start"
      data-testid="LeftBar"
    >
      <Row className="justify-content-center justify-content-lg-end" noGutters>
        <Col md="5" lg="9" className="mr-lg-3">
          <LeftNavBar />
        </Col>
      </Row>
      <Row className="justify-content-center justify-content-lg-end" noGutters>
        <Col md="5" lg="9" className="mt-2 mr-lg-3">
          <SidebarTweetButton />
        </Col>
      </Row>
      <Row
        className="justify-content-center mt-auto mb-3"
        noGutters
      >
        <Col md="5" lg="12" className="mt-5 mr-lg-3">
          <ProfileInfoButton />
        </Col>
      </Row>
    </div>
  );
}

export default LeftBar;
