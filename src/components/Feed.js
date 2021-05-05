import React, { useEffect, useState } from "react";
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
    <ul>
      {tweets.map((tweet) => (
        <div>{tweet.message}</div>
      ))}
    </ul>
  );
}

export default Feed;
