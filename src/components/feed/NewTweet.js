import { useState } from "react";
import Avatar from "../Avatar";
import { Row, Col, Form, Input } from "reactstrap";

import ToolBar from "../ToolBar";

//!Extract form to its own component
function NewTweet({ handleNewTweet }) {
  const [tweetText, setTweetText] = useState("");

  function handleChange(evt) {
    const { value } = evt.target;
    setTweetText(value);
  }

  function emptyTextBox() {
    setTweetText("");
  }

  return (
    <Row className="border p-3 d-none d-md-flex" noGutters={true}>
      <Col xs="1">
        <Avatar />
      </Col>

      <Col className="ml-3">
        <Form>
          <Input
            type="textarea"
            placeholder="What's happening?"
            value={tweetText}
            onChange={handleChange}
          />
          <Input className="mt-3" type="select">
            <option>Everyone </option>
            <option>People you follow</option>
            <option>Only people you mention</option>
          </Input>
        </Form>
        <ToolBar
          emptyTextBox={emptyTextBox}
          handleNewTweet={() => handleNewTweet(tweetText)}
        />
      </Col>
    </Row>
  );
}

export default NewTweet;
