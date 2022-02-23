import React from "react";


import TweetCard from "./TweetCard";

function TweetList(props) {
  const { user, toggleQuote, tweetList } = props;

  return (
    <ul className="mt-3 p-0">
      {tweetList.map((tweet) => (
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
