import React, { useEffect, useState } from "react";

import { Row, Col } from "reactstrap";

import TweetList from "./TweetList";
import NewTweet from "./NewTweet";
import FeedNavbar from "./FeedNavbar";
import NewTweetButton from "./NewTweetButton";
import BottomBar from "./BottomBar";

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
      <FeedNavbar />

      <NewTweet />
      <TweetList tweets={tweets} user={user} />
      <NewTweetButton />
      <BottomBar />
    </div>
  );
}

export default Feed;
