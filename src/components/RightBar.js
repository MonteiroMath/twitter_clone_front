import React from "react";
import { Col } from "reactstrap";

import SearchBar from "./SearchBar";
import WhatsHappening from "./WhatsHappening";

function RightBar(props) {
  return (
    <Col className="d-none d-lg-block p-2" lg="3">
      <SearchBar />
      <WhatsHappening />
      <div>who to follow</div>
    </Col>
  );
}

export default RightBar;
