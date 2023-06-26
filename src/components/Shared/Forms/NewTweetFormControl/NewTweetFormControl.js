import React, { useState } from "react";

import NewTweetFormDisplay from "./NewTweetFormDisplay/NewTweetFormDisplay";
import PollForm from "../PollForm/PollForm";
import Attachment from "../../Attachment/Attachment";
import RetweetBox from "../../TweetCard/RetweetBox/RetweetBox";
import ToolBar from "../../Bars/ToolBar/ToolBar";

import user from "../../../../assets/placeholders/user";

function NewTweetFormControl({
  quote,
  placeholder,
  submit_text,
  noPoll,
  handleSubmit,
}) {
  const [tweetText, setTweetText] = useState("");
  const [attach, setAttach] = useState("");
  const [poll, setPoll] = useState(false);
  const [pollChoices, setPollChoices] = useState(["", ""]);
  const [pollLength, setPollLength] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [block, setBlock] = useState(false);

  //control function for the text input field
  function handleTextChange(evt) {
    const { value } = evt.target;
    setTweetText(value);
  }

  //creates an attachment preview and updates the state
  function handleAttach(evt) {
    let preview = "";
    if (!attach) {
      preview = URL.createObjectURL(evt.target.files[0]);
      setBlock(true);
      evt.target.value = "";
    } else {
      URL.revokeObjectURL(attach);
      setBlock(false);
    }

    setAttach(preview);
  }

  //manages the display of the poll form fields
  function handlePoll(evt) {
    evt.preventDefault();
    clearPoll();
    setPoll(!poll);
    setBlock(!block);
  }

  //control function for the poll form choice fields
  function handleChoices(evt, i) {
    const { value } = evt.target;

    let newState = [...pollChoices];
    newState[i] = value;

    setPollChoices(newState);
  }

  //control function for the poll form length fields
  function handlePollLength(evt, field) {
    const { value } = evt.target;

    setPollLength(Object.assign({}, pollLength, { [field]: value }));
  }

  function clearPoll() {
    setPollChoices(["", ""]);
    setPollLength({
      days: 0,
      hours: 0,
      minutes: 0,
    });
  }

  //reset the state of the form to the default
  function clearForm() {
    setTweetText("");
    setAttach("");
    clearPoll();
    setPoll(false);
    setBlock(false);
  }

  //determines if the poll fields are filled
  function isPollFilled() {
    if (
      pollChoices[0].length > 0 &&
      pollChoices[0].length <= 25 &&
      pollChoices[1].length > 0 &&
      pollChoices[1].length <= 25 &&
      (pollLength.days > 0 || pollLength.hours > 0 || pollLength.minutes > 0)
    )
      return true;

    return false;
  }

  //defines if the Tweet Button is disabled or enabled
  function isDisabled() {
    let tweetLength =
      tweetText.trim().length === 0 || tweetText.trim().length > 280;

    if (poll && (tweetLength || !isPollFilled())) return true;
    else if (tweetLength && attach === "") return true;

    return false;
  }

  //!change the way these components are done
  let attachPreview = (
    <Attachment
      className="ctweetAttach"
      id="attachPreview"
      alt="update preview"
      url={attach}
      handleRemove={handleAttach}
      preview={true}
    />
  );

  let pollForm = (
    <PollForm
      poll={poll}
      choices={pollChoices}
      pollLength={pollLength}
      handlePoll={handlePoll}
      handleChoices={handleChoices}
      handlePollLength={handlePollLength}
    />
  );

  let toolBar = (
    <ToolBar
      handleAttach={handleAttach}
      block={block}
      handlePoll={handlePoll}
      isDisabled={isDisabled}
      handleSubmit={() => {
        handleSubmit({ tweetText, attach, poll, pollChoices, pollLength });
        clearForm();
      }}
      noPoll={noPoll}
      submit_text={submit_text}
    />
  );

  let quotePreview = quote ? <RetweetBox user={user} retweet={quote} /> : null;

  return (
    <NewTweetFormDisplay
      tweetText={tweetText}
      handleTextChange={handleTextChange}
      attachPreview={attachPreview}
      pollForm={pollForm}
      toolBar={toolBar}
      quotePreview={quotePreview}
      placeholder={placeholder}
    />
  );
}

export default NewTweetFormControl;
