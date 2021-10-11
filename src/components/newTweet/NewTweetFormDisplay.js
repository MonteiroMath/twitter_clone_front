import React from "react";
import { Form, Input } from "reactstrap";
import Attachment from "../Attachment.js";

function NewTweetFormDisplay(props) {
  const {
    tweetText,
    attach,
    handleTextChange,
    handleAttach,
    pollForm,
    toolBar,
  } = props;

  return (
    <div>
      <Form>
        <Input
          type="textarea"
          placeholder="What's happening?"
          value={tweetText}
          onChange={handleTextChange}
        />

        <Attachment
          className="ctweetAttach"
          id="attachPreview"
          alt="update preview"
          url={attach}
          handleRemove={handleAttach}
          preview={true}
        />

        {pollForm}

        <Input className="mt-3" type="select">
          <option>Everyone </option>
          <option>People you follow</option>
          <option>Only people you mention</option>
        </Input>
      </Form>
      {toolBar}
    </div>
  );
}

export default NewTweetFormDisplay;
