import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";

import FeedNavbar from "./Navbar/FeedNavbar";
import FeedTweetList from "./FeedTweetList/FeedTweetList";
import BottomBar from "./BottomBar/BottomBar";

import NewTweet from "../Shared/NewTweet/NewTweet";
import NewTweetButton from "../Shared/NewTweetButton/NewTweetButton";

import userData from "../../assets/placeholders/user";

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
      <FeedTweetList user={user} />
      <NewTweetButton />
      <BottomBar />
    </div>
  );
}

export default Feed;
