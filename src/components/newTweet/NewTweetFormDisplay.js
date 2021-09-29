import React from "react";
import { Form, Input } from "reactstrap";
import ToolBar from "./ToolBar.js";
import Attachment from "../Attachment.js";
import PollForm from "./PollForm.js";

function NewTweetFormDisplay(props) {
  const {
    tweetText,
    attach,
    poll,
    pollChoices,
    pollLength,
    block,
    handleTextChange,
    handleAttach,
    handleRemoveAttach,
    handlePoll,
    handleChoices,
    handlePollLength,
    clearForm,
    isDisabled,
    handleSubmit,
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
          handleRemove={handleRemoveAttach}
          preview={true}
        />

        <PollForm
          poll={poll}
          handlePoll={handlePoll}
          choices={pollChoices}
          handleChoices={handleChoices}
          pollLength={pollLength}
          handlePollLength={handlePollLength}
        />

        <Input className="mt-3" type="select">
          <option>Everyone </option>
          <option>People you follow</option>
          <option>Only people you mention</option>
        </Input>
      </Form>

      <ToolBar
        tweetText={tweetText}
        clearForm={clearForm}
        attach={attach}
        handleAttach={handleAttach}
        block={block}
        handlePoll={handlePoll}
        isDisabled={isDisabled}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default NewTweetFormDisplay;
