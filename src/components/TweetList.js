import React from "react";
import Tweet from "./Tweet";

function TweetList(props) {
  const { tweets, user } = props;

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
