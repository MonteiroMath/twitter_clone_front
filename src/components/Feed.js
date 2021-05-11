import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";

import TweetList from "./TweetList";
import NewTweet from "./NewTweet";
import FeedNavbar from "./FeedNavbar";
import NewTweetButton from "./NewTweetButton";

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
    <Col className="m-auto p-0" xs="12" md="10" lg="6">
      <FeedNavbar />
      <NewTweet />
      <TweetList tweets={tweets} user={user} />
      <NewTweetButton />
    </Col>
  );
}

export default Feed;
