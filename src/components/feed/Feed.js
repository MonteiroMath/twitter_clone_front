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
    let now = new Date();
    let ends;

    //!test bugs with dates
    if (newTweet.poll) {
      ends = new Date();

      ends.setDate(ends.getDay() + newTweet.pollSettings.days);
      ends.setHours(ends.getHours() + newTweet.pollSettings.hours);
      ends.setMinutes(ends.getMinutes() + newTweet.pollSettings.minutes);
    }

    let tweet = {
      id: 5,
      author: 1,
      created: now.toDateString(),
      message: newTweet.message,
      attach: newTweet.attach,
      poll: newTweet.poll,
      pollSettings: {
        choices: newTweet.pollSettings.choices,
        ends: ends,
        votes: [0, 11],
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
