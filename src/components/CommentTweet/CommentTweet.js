import React from "react";

import NewTweet from "../NewTweet/NewTweet";

/*
This component is a wrapper over the NewTweet component

It passes the necessary properties to assure correct behavior for comments while reusing the logic for normal tweets
*/

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
