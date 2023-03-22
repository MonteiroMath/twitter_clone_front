import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Row, Col } from "reactstrap";

import InfoBar from "./InfoBar/InfoBar";
import Message from "./Message/Message";
import Poll from "./Poll/Poll";
import InteractionBar from "./InteractionBar/InteractionBar";
import RetweetBox from "../RetweetBox/RetweetBox";
import Avatar from "../../Avatar/Avatar";
import Attachment from "../../Attachment/Attachment";
import NewTweetModal from "../../../Shared/Modals/NewTweetModal/NewTweetModal";
import AnswerModal from "../../../Shared/Modals/AnswerModal/AnswerModal";

//store imports
import { addRetweet, removeRetweet } from "../../../../store/tweetsSlice";

import { updateLike } from "../../../../store/tweetContentSlice";

function Tweet({ tweet, user, originalId }) {
  let retweeted = useMemo(
    () => tweet.retweets.some((retweet) => retweet.authorId === user.id),
    [tweet.retweets, user.id]
  );
  let liked = useMemo(
    () => tweet.likers.some((liker) => liker.id === user.id),
    [tweet.likers, user.id]
  );

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
        <InfoBar username={user.username} created={tweet.createdAt} />
        <Link to={`/tweet/${tweet.parent ? tweet.parent : originalId}`}>
          <Message message={tweet.message} />
        </Link>
        <Attachment url={tweet.attachment} />
        {/* <Poll
          poll={tweet.poll}
          pollSettings={tweet.pollSettings}
          start={tweet.createdAt}
        />*/}
        {/* commentedContent ? (
          <RetweetBox retweet={commentedContent} user={user} />
        ) : null */}
        <InteractionBar
          likes={tweet.likers.length}
          retweets={tweet.retweets.length}
          comments={tweet.comments.length}
          liked={liked}
          retweeted={retweeted}
          handleLike={handleLike}
          handleRetweet={handleRetweet}
          toggleQuote={toggleQuote}
          toggleAnswer={toggleAnswer}
        />
      </Col>
      <NewTweetModal modal={modal} toggleQuote={toggleQuote} quote={tweet} />
      <AnswerModal
        modal={answerModal}
        toggle={toggleAnswer}
        parentId={originalId}
        parentContent={tweet}
      />
    </Row>
  );
}

export default Tweet;
