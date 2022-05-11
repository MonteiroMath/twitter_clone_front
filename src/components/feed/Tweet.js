import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateLike, addRetweet, removeRetweet } from "../../store/tweetsSlice";

import { Row, Col } from "reactstrap";

import Attachment from "../Attachment";

import Avatar from "../Avatar";
import InfoBar from "./InfoBar";
import Message from "./Message";
import Poll from "./Poll";
import InteractionBar from "./InteractionBar";
import RetweetBox from "./RetweetBox.js";
import NewTweetModal from "../NewTweetModal";
import AnswerModal from "../AnswerModal";

function Tweet({ tweet, user }) {
  let { retweet } = tweet;
  let retweeted = tweet.retweeted_by.includes(user.id);
  let liked = tweet.liked_by.includes(user.id);

  const [modal, setModal] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);

  let dispatch = useDispatch();

  async function handleLike() {
    dispatch(updateLike({ id: tweet.id, userId: user.id, like: !liked }));
  }

  function handleRetweet() {
    let action = retweeted ? removeRetweet : addRetweet;

    dispatch(action({ tweetId: tweet.id, userId: user.id }));
  }

  const toggleQuote = () => {
    setModal(!modal);
  };

  const toggleAnswer = () => {
    setAnswerModal(!answerModal);
  };

  return (
    <Row noGutters>
      <Col xs="2" md="1">
        <Avatar />
      </Col>
      <Col xs="9" md="10" className="ml-1 ml-md-3">
        <InfoBar username={user.username} created={tweet.created_at} />
        <Link to={`/tweet/${tweet.id}`}>
          <Message message={tweet.message} />
        </Link>
        <Attachment url={tweet.attach} />
        <Poll
          poll={tweet.poll}
          pollSettings={tweet.pollSettings}
          start={tweet.created}
        />
        {retweet ? <RetweetBox retweet={retweet} user={user} /> : null}
        <InteractionBar
          likes={tweet.liked_by.length}
          retweets={tweet.retweeted_by.length}
          comments={tweet.comment_ids.length}
          liked={liked}
          retweeted={retweeted}
          handleLike={handleLike}
          handleRetweet={handleRetweet}
          toggleQuote={toggleQuote}
          toggleAnswer={toggleAnswer}
        />
      </Col>
      <NewTweetModal modal={modal} toggleQuote={toggleQuote} quote={tweet} />
      <AnswerModal modal={answerModal} toggle={toggleAnswer} parent={tweet} />
    </Row>
  );
}

export default Tweet;
