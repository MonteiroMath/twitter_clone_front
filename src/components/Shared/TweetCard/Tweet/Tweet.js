import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import {
  addRetweet,
  removeRetweet,
  addLike,
  deleteLike,
} from "../../../../store/tweetsSlice";

function Tweet({ tweet, user, originalId }) {
  const [modal, setModal] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);

  let dispatch = useDispatch();

  async function handleLike() {
    let action = tweet.liked ? deleteLike : addLike;
    dispatch(action({ id: tweet.id, userId: user.id }));
  }

  function handleRetweet() {
    let action = tweet.retweeted ? removeRetweet : addRetweet;

    dispatch(action({ tweetId: tweet.id, userId: user.id }));
  }

  const toggleQuote = () => {
    setModal(!modal);
  };

  const toggleAnswer = () => {
    setAnswerModal(!answerModal);
  };

  console.log(tweet.id, " - ", tweet.type, " - ", tweet.message);
  console.log(tweet);

  return (
    <Row noGutters>
      <Col xs="2" md="1">
        <Avatar />
      </Col>
      <Col xs="9" md="10" className="ml-1 ml-md-3">
        <InfoBar username={user.username} created={tweet.createdAt} />
        <Link
          to={`/tweet/${
            tweet.type === "answer" ? tweet.referenceId : tweet.id
          }`}
        >
          <Message message={tweet.message} />
        </Link>
        <Attachment url={tweet.attachment} />
        {/* <Poll
          poll={tweet.poll}
          pollSettings={tweet.pollSettings}
          start={tweet.createdAt}
        />*/}
        {tweet.type === "comment" ? (
          <RetweetBox retweet={tweet} user={user} />
        ) : null}
        <InteractionBar
          likes={tweet.likesCount}
          retweets={tweet.retweetsCount}
          comments={tweet.commentsCount}
          liked={tweet.liked}
          retweeted={tweet.retweeted}
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
