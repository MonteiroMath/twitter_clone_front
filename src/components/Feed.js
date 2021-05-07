import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";

import TweetList from "./TweetList";
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
    <Col className="m-auto" xs="12" md="10" lg="6">
      <NewTweet />
      <TweetList tweets={tweets} user={user} />
    </Col>
  );
}

export default Feed;
