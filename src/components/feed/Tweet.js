import React from "react";

import { useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";

import Attachment from "../Attachment";

import Avatar from "../Avatar";
import InfoBar from "./InfoBar";
import Message from "./Message";
import Poll from "./Poll";
import InteractionBar from "./InteractionBar";
import RetweetBox from "./RetweetBox.js";
import { ACTIONS } from "../../store/actions";
import { Link } from "react-router-dom";

function Tweet(props) {
  let { tweet, user, toggleQuote } = props;
  let { retweet } = tweet;
  let retweeted = tweet.retweeted_by.includes(user.id);
  let liked = tweet.liked_by.includes(user.id);

  let dispatch = useDispatch();

  function handleLike() {
    let type = liked ? ACTIONS.UNLIKE : ACTIONS.LIKE;
    dispatch({
      type,
      payload: { id: tweet.id, userId: user.id },
    });
  }

  function handleRetweet() {
    let type = retweeted ? ACTIONS.UNDO_RETWEET : ACTIONS.RETWEET;

    dispatch({
      type,
      payload: { tweetId: tweet.id, userId: user.id },
    });
  }

  return (
    <Row noGutters>
      <Col xs="2" md="1">
        <Avatar />
      </Col>
      <Col xs="9" md="10" className="ml-1 ml-md-3">
        <InfoBar username={user.username} created={tweet.created} />
        <Link to={`/${tweet.id}`}>
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
          likes={tweet.likes}
          retweets={tweet.retweets}
          comments={tweet.comments}
          liked={liked}
          retweeted={retweeted}
          handleLike={handleLike}
          handleRetweet={handleRetweet}
          toggleQuote={toggleQuote}
        />
      </Col>
    </Row>
  );
}

export default Tweet;
