import { Row, Col } from "reactstrap";

import CommentForm from "./CommentForm/CommentForm";
import Avatar from "../Avatar/Avatar";
import NewTweetForm from "../Forms/NewTweetForm/NewTweetForm";

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
