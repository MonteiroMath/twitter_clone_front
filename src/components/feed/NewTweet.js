import { useState } from "react";
import Avatar from "../Avatar";
import { Row, Col, Form, Input } from "reactstrap";

import ToolBar from "../ToolBar";
import TweetButton from "../TweetButton";

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
        <Row noGutters={true}>
          <Col>
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
          </Col>
        </Row>

        <Row className="pt-2" noGutters={true}>
          <ToolBar
            emptyTextBox={emptyTextBox}
            handleNewTweet={() => handleNewTweet(tweetText)}
          />
          <div className="ml-auto mr-3">
            <TweetButton
              disabled={tweetText == ""}
              handleClick={(evt) => {
                evt.preventDefault();
                handleNewTweet(tweetText);
                emptyTextBox();
              }}
            />
          </div>
        </Row>
      </Col>
    </Row>
  );
}

export default NewTweet;
