import { Row, Col } from "reactstrap";

import Avatar from "../Avatar/Avatar";
import NewTweetForm from "../Forms/NewTweetForm/NewTweetForm";

/* 
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

*/

function NewTweet({ toggle }) {
  return (
    <Row className="w-100" noGutters={true}>
      <Col xs="2" md="1">
        <Avatar />
      </Col>

      <Col className="ml-3">
        <NewTweetForm toggle={toggle} placeholder="What's happening?" />
      </Col>
    </Row>
  );
}

export default NewTweet;
