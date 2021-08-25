import React, { useState } from "react";
import { Form, Input } from "reactstrap";
import ToolBar from "../ToolBar";
import Attachment from "../Attachment";
import PollForm from "./Poll";

//! if complexity builds up, divide into FormControl and FormDisplay components

function NewTweetForm({ handleNewTweet }) {
  const [tweetText, setTweetText] = useState("");
  const [attach, setAttach] = useState("");
  const [poll, setPoll] = useState(false);
  const [block, setBlock] = useState(false);

  function handleChange(evt) {
    const { value } = evt.target;
    setTweetText(value);
  }

  function handleAttach(evt) {
    let preview = "";
    if (evt.target.files[0]) {
      preview = URL.createObjectURL(evt.target.files[0]);
      setBlock(true);
    } else {
      URL.revokeObjectURL(preview);
      setBlock(false);
      preview = "";
    }

    setAttach(preview);
  }

  function handlePoll(evt) {
    evt.preventDefault();
    setPoll(!poll);
    setBlock(!block);
  }

  function handleRemove() {
    URL.revokeObjectURL(attach);
    setAttach("");
    setBlock(false);
  }

  function clearForm() {
    setTweetText("");
    setAttach("");
    setPoll(false);
    setBlock(false);
  }

  return (
    <Form>
      <Input
        type="textarea"
        placeholder="What's happening?"
        value={tweetText}
        onChange={handleChange}
      />

      <Attachment
        className="ctweetAttach"
        id="attachPreview"
        alt="update preview"
        url={attach}
        handleRemove={handleRemove}
        preview={true}
      />

      <PollForm poll={poll} handlePoll={handlePoll} />

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
        block={block}
        handlePoll={handlePoll}
      />
    </Form>
  );
}

export default NewTweetForm;
