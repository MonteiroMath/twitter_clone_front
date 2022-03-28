import Avatar from "../Avatar";
import { Row, Col } from "reactstrap";

import NewTweetForm from "./NewTweetForm";
import CommentForm from "../CommentForm";

function NewTweet({ toggle, quote, placeholder, parent_id }) {
  const Form = parent_id ? CommentForm : NewTweetForm;

  return (
    <Row className="w-100" noGutters={true}>
      <Col xs="2" md="1">
        <Avatar />
      </Col>

      <Col className="ml-3">
        <Form
          toggle={toggle}
          quote={quote}
          placeholder={placeholder}
          parent_id={parent_id}
          redirect="/"
        />
      </Col>
    </Row>
  );
}

export default NewTweet;
