import React from "react";
import NewTweetForm from "./newTweet/NewTweetForm";

export default function CommentForm({ parent_id }) {
  return (
    <NewTweetForm
      placeholder={"Answer this tweet"}
      parent_id={parent_id}
    />
  );
}
