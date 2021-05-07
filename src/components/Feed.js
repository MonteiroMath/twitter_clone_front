import React, { useEffect, useState } from "react";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";
import userData from "../placeholders/user";
import tweetData from "../placeholders/tweets";

function Feed(props) {
  let [user, setUser] = useState(null);
  let [tweets, setTweets] = useState([]);

  useEffect(() => {
    setUser(userData);
    setTweets(tweetData);
  }, []);

  return (
    <div>
      <NewTweet />

      <ul className="p-0">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} user={user} />
        ))}
      </ul>
    </div>
  );
}

export default Feed;
