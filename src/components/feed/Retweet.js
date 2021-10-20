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
import { RetweetIcon } from "../svg/Svg";

function Retweet(props) {
  let { retweet, user } = props;
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
    <Row noGutters>
      <Col className="ml-auto pb-1 cBold cfontSmall" xs={11}>
        <RetweetIcon />
        <span className="ml-2">You retweeted</span>
      </Col>
      <Col className="mx-auto" xs={12}>
        <Tweet tweet={tweet} user={user} />
      </Col>
    </Row>
  );
}

export default Retweet;
