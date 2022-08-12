import React from "react";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";

import TweetList from "./Shared/TweetList/TweetList";

function SubsetTweetList({ user, tweetList }) {
  const tweetStatus = useSelector((state) => state.tweets.status);
  const error = useSelector((state) => state.tweets.error);

  let content = null;

  if (tweetStatus === "fulfilled") {
    content = <TweetList user={user} tweetList={tweetList} />;
  } else if (tweetStatus === "pending") {
    content = <Spinner color="info" />;
  } else if (tweetStatus === "rejected") {
    content = <div>{error}</div>;
  }

  return content;
}

export default SubsetTweetList;
