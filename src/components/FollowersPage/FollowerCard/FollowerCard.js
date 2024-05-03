import { Container, Row, Col } from "reactstrap";

import Avatar from "../../Shared/Avatar/Avatar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "reactstrap";

function FollowerCard({ follower }) {
  return (
    <Container>
      <Row className="align-items-center mt-3">
        <Col xs="2" md="1">
          <Avatar avatar={follower.avatar} />
        </Col>
        <Col xs="6" md="7" className="ml-1 ml-md-3">
          <div className="font-weight-bold">
            <Link to={`/${follower.username}`}>{follower.username}</Link>
          </div>
          <div className="text-secondary pl-2">{`@${follower.username}`}</div>
        </Col>
        <Button
          className="mt-2"
          color="primary"
          outline
          onClick={() => console.log("todo")}
        >
          Unfollow
        </Button>
      </Row>
      <Row>
        <Col xs="10" md="11" className="ml-auto mt-2">
          {/*{follower.description}*/} Lorem IPsum Lorem IPsum
        </Col>
      </Row>
    </Container>
  );
}

export default FollowerCard;
