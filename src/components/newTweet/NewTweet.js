import Avatar from "../Avatar";
import { Row, Col } from "reactstrap";

import NewTweetForm from "./NewTweetForm";

function NewTweet() {
  return (
    <Row className="w-100 mt-3" noGutters={true}>
      <Col xs="2" md="1" className="ml-1">
        <Avatar />
      </Col>

      <Col className="ml-1 mr-1">
        <NewTweetForm />
        
      </Col>
    </Row>
  );
}

export default NewTweet;
