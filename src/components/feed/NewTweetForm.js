import React, { useState } from "react";
import { Form, Input } from "reactstrap";
import ToolBar from "../ToolBar";
import Attachment from "../Attachment";

//! if complexity builds up, divide into FormControl and FormDisplay components

function NewTweetForm({ handleNewTweet }) {
  const [tweetText, setTweetText] = useState("");
  const [attach, setAttach] = useState("");

  function handleChange(evt) {
    const { value } = evt.target;
    setTweetText(value);
  }

  function handleAttach(evt) {
    if (evt.target.files[0]) {
      preview = URL.createObjectURL(evt.target.files[0]);
    } else {
      URL.revokeObjectURL(preview);
      preview = "";
    }

    setAttach(preview);
  }

  function clearForm() {
    setTweetText("");
    setAttach("");
  }

  let preview = attach ? (
    <div className="mt-2">
      <Attachment
        className="ctweetAttach"
        id="attachPreview"
        alt="update preview"
        url={attach}
      />
    </div>
  ) : null;

  return (
    <Form>
      <Input
        type="textarea"
        placeholder="What's happening?"
        value={tweetText}
        onChange={handleChange}
      />
      {preview}
      <Input className="mt-3" type="select">
        <option>Everyone </option>
        <option>People you follow</option>
        <option>Only people you mention</option>
      </Input>

      <ToolBar
        tweetText={tweetText}
        clearForm={clearForm}
        handleNewTweet={handleNewTweet}
        attach={attach}
        handleAttach={handleAttach}
      />
    </Form>
  );
}

export default NewTweetForm;
