import Avatar from "../Avatar";
import { Row, Col } from "reactstrap";

import NewTweetFormControl from "./NewTweetFormControl";

function NewTweet() {
  return (
    <Row className="border p-3 d-none d-md-flex" noGutters={true}>
      <Col xs="1">
        <Avatar />
      </Col>

      <Col className="ml-3">
        <NewTweetFormControl />
      </Col>
    </Row>
  );
}

export default NewTweet;
