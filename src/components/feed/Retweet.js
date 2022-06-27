import React from "react";
import { Row, Col } from "reactstrap";

import { RetweetIcon } from "../svg/Svg";

function Retweet(props) {
  let { children } = props;

  return (
    <Row noGutters>
      <Col
        className="ml-auto pl-2 pl-md-3 pb-1 cBold cfontSmall"
        xs="10"
        md="11"
      >
        <RetweetIcon />
        <span className="ml-2">You retweeted</span>
      </Col>
      <Col className="mx-auto" xs="12">
        {children}
      </Col>
    </Row>
  );
}

export default Retweet;
