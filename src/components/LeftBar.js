import React from "react";
import { Row } from "reactstrap";

import LeftNavBar from "./LeftNavBar";
import ProfileInfoButton from "./ProfileInfoButton";

function LeftBar(props) {
  return (
    <div>
      <Row className="justify-content-end justify-content-lg-center" noGutters>
        <LeftNavBar />
      </Row>

      <Row className="justify-content-end justify-content-lg-center mt-5 mr-3">
        <ProfileInfoButton />
      </Row>
    </div>
  );
}

export default LeftBar;
