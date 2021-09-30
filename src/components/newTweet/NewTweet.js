import Avatar from "../Avatar";
import { Row, Col } from "reactstrap";

import NewTweetForm from "./NewTweetForm";

function NewTweet({ toggle }) {
  return (
    <Row className="w-100" noGutters={true}>
      <Col xs="2" md="1">
        <Avatar />
      </Col>

      <Col className="ml-3">
        <NewTweetForm toggle={toggle} />
      </Col>
    </Row>
  );
}

export default NewTweet;
