import React from "react";

import Tweet from "./Tweet";
import Retweet from "./Retweet";

function TweetCard(props) {
  let { tweet, user } = props;

  return tweet.tweet ? (
    <Retweet retweet={tweet} user={user} />
  ) : (
    <Tweet tweet={tweet} user={user} />
  );
}

export default TweetCard;
