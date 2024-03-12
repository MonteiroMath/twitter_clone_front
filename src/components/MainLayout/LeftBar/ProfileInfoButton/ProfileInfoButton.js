import React from "react";
import { Row, Col, Button } from "reactstrap";

import Avatar from "../../../Shared/Avatar/Avatar";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../store/UserSlice";

function ProfileInfoButton(props) {
  const user = useSelector((state) => selectUserData(state));

  return (
    <Button className="p-0" color="white">
      <Row noGutters>
        <Col>
          <Avatar size="45px" />
        </Col>
        <Col className="d-none d-lg-block">
          <div className="ml-3 text-left">
            <div className="cfw-bolder">{user.username}</div>
            <div className="text-secondary">{`@${user.username}`}</div>
          </div>
        </Col>
      </Row>
    </Button>
  );
}

export default ProfileInfoButton;
