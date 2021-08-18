import React from "react";
import { Form, Input } from "reactstrap";

function NewTweetForm({ tweetText, handleChange }) {
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
    </Form>
  );
}

export default NewTweetForm;
