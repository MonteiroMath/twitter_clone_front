import React from "react";

import { Spinner } from "reactstrap";
import TweetList from "../../Shared/TweetList/TweetList";

function FeedTweetList({ status, tweetList, error }) {
  return (
    <>
      {status === "fulfilled" && <TweetList tweetList={tweetList} />}
      {status === "loading" && <Spinner color="info" />}
      {status === "failed" && <div>{error}</div>}
    </>
  );
}

export default FeedTweetList;
