import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Modal, ModalHeader, ModalBody } from "reactstrap";

import NewTweet from "../newTweet/NewTweet";

import FeedNavbar from "./FeedNavbar";
import TweetList from "./TweetList";
import NewTweetButton from "./NewTweetButton";
import BottomBar from "./BottomBar";

import userData from "../../placeholders/user";
import NewTweetModal from "../NewTweetModal";

function Feed(props) {
  let [user, setUser] = useState({});

  const [quote, setQuote] = useState(null);

  const tweetList = [...useSelector((state) => state.tweets)].reverse();

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
      <TweetList user={user} tweetList={tweetList} />
      <NewTweetButton />
      <BottomBar />
    </div>
  );
}

export default Feed;
