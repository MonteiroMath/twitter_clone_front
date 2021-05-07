import Avatar from "./Avatar";
import { Row, Col, Form, Input } from "reactstrap";

import ToolBar from "./ToolBar";

function NewTweet(props) {
  return (
    <Col className="border m-auto p-3" xs="12" md="10" lg="6">
      <Row noGutters={true}>
        <Col xs="2">
          <Avatar />
        </Col>

        <Col>
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
    </Col>
  );
}

export default NewTweet;
