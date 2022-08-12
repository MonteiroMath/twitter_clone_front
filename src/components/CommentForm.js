import React from "react";
import NewTweetForm from "./NewTweet/Form/NewTweetForm";

export default function CommentForm({ parent_id, toggle }) {
  return (
    <NewTweetForm
      placeholder={"Answer this tweet"}
      toggle={toggle}
      submit_text={"Comment"}
      parent_id={parent_id}
      noPoll={true}
    />
  );
}
