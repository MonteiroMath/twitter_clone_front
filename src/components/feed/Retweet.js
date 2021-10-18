import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";

import Attachment from "../Attachment";

import Avatar from "../Avatar";
import InfoBar from "./InfoBar";
import Message from "./Message";
import Poll from "./Poll";
import InteractionBar from "./InteractionBar";
import { ACTIONS } from "../../store/actions";

import Tweet from "./Tweet";

function Retweet(props) {
  let { retweet, user } = props;
  console.log(retweet.tweet);
  let { tweet } = retweet;

  const [liked, setLiked] = useState(false);
  let dispatch = useDispatch();

  function handleLike() {
    let type = liked ? ACTIONS.UNLIKE : ACTIONS.LIKE;
    dispatch({
      type,
      payload: { id: retweet.id },
    });

    setLiked(!liked);
  }

  return (
    <Row className="border p-3" noGutters>
      <Col xs={12}>You retweeted</Col>
      <Col className="mx-auto" xs={12}>
        <Tweet tweet={tweet} user={user} />
      </Col>
    </Row>
  );
}

export default Retweet;
