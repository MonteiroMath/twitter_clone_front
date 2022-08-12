import React from "react";

import NewTweet from "./NewTweet/NewTweet";

export default function CommentTweet({
  toggle,
  quote,
  placeholder,
  parent_id,
}) {
  return (
    <NewTweet
      toggle={toggle}
      quote={quote}
      placeholder={placeholder}
      parent_id={parent_id}
    />
  );
}
