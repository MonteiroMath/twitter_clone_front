import Avatar from "../Avatar";
import { Row, Col } from "reactstrap";

import NewTweetForm from "./NewTweetForm";

function NewTweet({ handleNewTweet }) {
  return (
    <Row className="border p-3 d-none d-md-flex" noGutters={true}>
      <Col xs="1">
        <Avatar />
      </Col>

      <Col className="ml-3">
        <NewTweetForm handleNewTweet={handleNewTweet} />
      </Col>
    </Row>
  );
}

export default NewTweet;