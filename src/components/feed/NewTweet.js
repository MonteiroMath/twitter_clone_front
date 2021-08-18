import { useState } from "react";
import Avatar from "../Avatar";
import { Row, Col } from "reactstrap";

import NewTweetForm from "./NewTweetForm";
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
            <NewTweetForm tweetText={tweetText} handleChange={handleChange} />
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
