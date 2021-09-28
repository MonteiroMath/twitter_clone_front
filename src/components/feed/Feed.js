import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import TweetList from "./TweetList";
import NewTweet from "./NewTweet";
import FeedNavbar from "./FeedNavbar";
import NewTweetButton from "../NewTweetButton";
import BottomBar from "./BottomBar";

import userData from "../../placeholders/user";

function Feed(props) {
  let [user, setUser] = useState({});

  const tweets = [...useSelector((state) => state.tweets)].reverse();

  useEffect(() => {
    setUser(userData);
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
