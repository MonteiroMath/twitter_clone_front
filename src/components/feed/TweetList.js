import React from "react";
import { useSelector } from "react-redux";

import TweetCard from "./TweetCard";

function TweetList(props) {
  const { user, toggleQuote } = props;

  const tweets = [...useSelector((state) => state.tweets)].reverse();

  return (
    <ul className="mt-3 p-0">
      {tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          user={user}
          toggleQuote={toggleQuote}
        />
      ))}
    </ul>
  );
}

export default TweetList;
