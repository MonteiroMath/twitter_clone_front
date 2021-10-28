import React, { useState } from "react";

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

//! interaction bar is starting to get convoluted
function Tweet(props) {
  let { tweet, user } = props;
  let { retweet } = tweet;
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  let dispatch = useDispatch();

  function handleLike() {
    let type = liked ? ACTIONS.UNLIKE : ACTIONS.LIKE;
    dispatch({
      type,
      payload: { id: tweet.id },
    });

    setLiked(!liked);
  }

  function handleRetweet() {
    dispatch({
      type: ACTIONS.RETWEET,
      payload: { tweet },
    });

    setRetweeted(!retweeted);
  }

  return (
    <Row noGutters>
      <Col xs="2" md="1">
        <Avatar />
      </Col>
      <Col xs="9" md="10" className="ml-1 ml-md-3">
        <InfoBar username={user.username} created={tweet.created} />
        <Message message={tweet.message} />
        <Attachment url={tweet.attach} />
        <Poll
          poll={tweet.poll}
          pollSettings={tweet.pollSettings}
          start={tweet.created}
        />
        {retweet ? <RetweetBox retweet={retweet} user={user} /> : null}
        <InteractionBar
          likes={tweet.likes}
          liked={liked}
          retweeted={retweeted}
          handleLike={handleLike}
          handleRetweet={handleRetweet}
          retweets={tweet.retweets}
          comments={tweet.comments}
        />
      </Col>
    </Row>
  );
}

export default Tweet;
