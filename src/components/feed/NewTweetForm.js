import React, { useState } from "react";
import { Form, Input } from "reactstrap";
import ToolBar from "../ToolBar";

function NewTweetForm({ handleNewTweet }) {
  const [tweetText, setTweetText] = useState("");

  function handleChange(evt) {
    const { value } = evt.target;
    setTweetText(value);
  }

  function emptyTextBox() {
    setTweetText("");
  }

  return (
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

      <ToolBar
        tweetText={tweetText}
        emptyTextBox={emptyTextBox}
        handleNewTweet={handleNewTweet}
      />
    </Form>
  );
}

export default NewTweetForm;
