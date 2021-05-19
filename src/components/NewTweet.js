import Avatar from "./Avatar";
import { Row, Col, Form, Input } from "reactstrap";

import ToolBar from "./ToolBar";

//!Extract form to its own component
function NewTweet(props) {
  return (
    <Row
      className="border p-3 d-none d-md-flex"
      noGutters={true}
    >
      <Col xs="1">
        <Avatar />
      </Col>

      <Col className="ml-3">
        <Form>
          <Input type="textarea" placeholder="What's happening?" />
          <Input className="mt-3" type="select">
            <option>Everyone </option>
            <option>People you follow</option>
            <option>Only people you mention</option>
          </Input>
        </Form>
        <ToolBar />
      </Col>
    </Row>
  );
}

export default NewTweet;
