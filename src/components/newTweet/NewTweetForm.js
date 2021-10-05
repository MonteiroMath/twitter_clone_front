import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ACTIONS } from "../../store/actions";

import NewTweetFormDisplay from "./NewTweetFormDisplay";

function NewTweetForm({ toggle }) {
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
  const dispatch = useDispatch();
  let history = useHistory();

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
    setPollChoices(["", ""]);
    setPollLength({
      days: 0,
      hours: 0,
      minutes: 0,
    });
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

  //reset the state of the form to the default
  function clearForm(toggle) {
    setTweetText("");
    setAttach("");
    setPoll(false);
    setPollChoices(["", ""]);
    setPollLength({
      days: 0,
      hours: 0,
      minutes: 0,
    });
    setBlock(false);

    if (toggle) toggle();
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

  //handles submission of tweet
  function handleSubmit(evt) {
    dispatch({
      type: ACTIONS.POST_TWEET,
      payload: {
        newTweet: {
          message: tweetText,
          attach: attach,
          poll: poll,
          pollSettings: {
            choices: pollChoices,
            pollLen: pollLength,
          },
        },
      },
    });

    clearForm(toggle);

    history.push("/");
  }

  return (
    <NewTweetFormDisplay
      tweetText={tweetText}
      attach={attach}
      poll={poll}
      pollChoices={pollChoices}
      pollLength={pollLength}
      block={block}
      handleTextChange={handleTextChange}
      handleAttach={handleAttach}
      handlePoll={handlePoll}
      handleChoices={handleChoices}
      handlePollLength={handlePollLength}
      clearForm={clearForm}
      isDisabled={isDisabled}
      handleSubmit={handleSubmit}
    />
  );
}

export default NewTweetForm;
