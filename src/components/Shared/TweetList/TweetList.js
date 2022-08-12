import React from "react";

import TweetCard from "./TweetCard/TweetCard";

function TweetList(props) {
  const { user, tweetList } = props;

  return (
    <ul className="mt-3 p-0">
      {tweetList.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} user={user} />
      ))}
    </ul>
  );
}

export default TweetList;
