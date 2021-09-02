import React, { useEffect, useState } from "react";

import TweetList from "./TweetList";
import NewTweet from "./NewTweet";
import FeedNavbar from "./FeedNavbar";
import NewTweetButton from "../NewTweetButton";
import BottomBar from "./BottomBar";

import userData from "../../placeholders/user";
import tweetData from "../../placeholders/tweets";

function Feed(props) {
  let [user, setUser] = useState(null);
  let [tweets, setTweets] = useState([]);

  useEffect(() => {
    setUser(userData);
    setTweets(tweetData.reverse());
  }, []);

  function handleNewTweet(newTweet) {
    let now = new Date().getTime();

    let tweet = {
      id: 5,
      author: 1,
      created: now,
      message: newTweet.message,
      attach: newTweet.attach,
      poll: newTweet.poll,
      pollSettings: {
        choices: newTweet.pollSettings.choices,
        pollLen: newTweet.pollSettings.pollLen,
        votes: [0, 0],
      },
      likes: 0,
      retweets: 0,
      comments: 0,
    };

    setTweets([tweet, ...tweets]);
  }

  return (
    <div>
      <FeedNavbar />
      <NewTweet handleNewTweet={handleNewTweet} />
      <TweetList tweets={tweets} user={user} />
      <NewTweetButton />
      <BottomBar />
    </div>
  );
}

export default Feed;
