import React, { useEffect, useState } from "react";

import { Row } from "reactstrap";

import NewTweet from "../newTweet/NewTweet";

import FeedNavbar from "./FeedNavbar";
import TweetList from "./TweetList";
import NewTweetButton from "./NewTweetButton";
import BottomBar from "./BottomBar";

import userData from "../../placeholders/user";

function Feed(props) {
  let [user, setUser] = useState({});

  useEffect(() => {
    setUser(userData);
  }, []);

  return (
    <div>
      <Row className="sticky-top border bg-white" noGutters>
        <FeedNavbar />
      </Row>
      <Row className="border p-3 d-none d-md-flex" noGutters={true}>
        <NewTweet />
      </Row>
      <TweetList user={user} />
      <NewTweetButton />
      <BottomBar />
    </div>
  );
}

export default Feed;
