import React from "react";
import { Form, Input } from "reactstrap";

function NewTweetFormDisplay(props) {
  const {
    tweetText,
    attachPreview,
    handleTextChange,
    pollForm,
    toolBar,
    quotePreview,
    placeholder
  } = props;

  return (
    <div>
      <Form>
        <Input
          type="textarea"
          placeholder={placeholder ? placeholder : "What's happening?"}
          value={tweetText}
          onChange={handleTextChange}
        />

        {attachPreview}
        {pollForm}
        {quotePreview}

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
