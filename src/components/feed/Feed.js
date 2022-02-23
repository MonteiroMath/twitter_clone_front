import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Modal, ModalHeader, ModalBody } from "reactstrap";

import NewTweet from "../newTweet/NewTweet";

import FeedNavbar from "./FeedNavbar";
import TweetList from "./TweetList";
import NewTweetButton from "./NewTweetButton";
import BottomBar from "./BottomBar";

import userData from "../../placeholders/user";

function Feed(props) {
  let [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const [quote, setQuote] = useState(null);

  const tweetList = [...useSelector((state) => state.tweets)].reverse();

  useEffect(() => {
    setUser(userData);
  }, []);

  const toggleQuote = (tweet) => {
    quote ? setQuote(null) : setQuote(tweet);
    setModal(!modal);
  };

  return (
    <div>
      <Row className="sticky-top border bg-white" noGutters>
        <FeedNavbar />
      </Row>
      <Row className="border p-3 d-none d-md-flex" noGutters={true}>
        <NewTweet />
      </Row>
      <TweetList user={user} toggleQuote={toggleQuote} tweetList={tweetList} />
      <NewTweetButton />
      <BottomBar />
      <Modal isOpen={modal} toggle={toggleQuote}>
        <ModalHeader toggle={toggleQuote} />
        <ModalBody>
          <NewTweet
            toggle={toggleQuote}
            quote={quote}
            placeholder="Add Comment"
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Feed;
