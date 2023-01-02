import React from "react";
import NewTweetForm from "../Shared/NewTweetForm/NewTweetForm";

/*
  This component is a wrapper over the NewTweetForm components passing the necessary proporties to assure the correct form behavior.

  It is likely to be changed because NewTweetForm logic has gotten out of hand
*/
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
