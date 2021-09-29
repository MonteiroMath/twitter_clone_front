import React from "react";
import { useSelector } from "react-redux";

import Tweet from "./Tweet";

function TweetList(props) {
  const { user } = props;

  const tweets = [...useSelector((state) => state.tweets)].reverse();

  return (
    <div className="mt-3">
      <ul className="p-0">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} user={user} />
        ))}
      </ul>
    </div>
  );
}

export default TweetList;
