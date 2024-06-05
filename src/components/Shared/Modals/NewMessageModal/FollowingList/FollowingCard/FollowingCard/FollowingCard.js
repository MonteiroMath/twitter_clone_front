import { Row, Col } from "reactstrap";
import Avatar from "../../../../../Avatar/Avatar";

function FollowingCard({ user, handleClick }) {
  return (
    <Row className="mt-4 cpointer chover_darken py-2" onClick={handleClick}>
      <Col xs="2">
        <Avatar />
      </Col>
      <Col>
        <div className="cfw-bolder">{user.username}</div>
        <div className="text-muted">@{user.username} </div>
      </Col>
    </Row>
  );
}

export default FollowingCard;
