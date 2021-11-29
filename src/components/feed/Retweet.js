import React, { useState } from "react";

import { useSelector } from "react-redux";

import { Row, Col } from "reactstrap";

import Tweet from "./Tweet";
import { RetweetIcon } from "../svg/Svg";


function Retweet(props) {
  let { retweet, user, toggleQuote } = props;

  let tweet = useSelector((state) => {
    return state.tweets.find((tweet) => tweet.id === retweet.tweetId);
  });

  return (
    <Row noGutters>
      <Col
        className="ml-auto pl-2 pl-md-3 pb-1 cBold cfontSmall"
        xs="10"
        md="11"
      >
        <RetweetIcon />
        <span className="ml-2">You retweeted</span>
      </Col>
      <Col className="mx-auto" xs="12">
        <Tweet tweet={tweet} user={user} toggleQuote={() => toggleQuote(tweet)} />
      </Col>
    </Row>
  );
}

export default Retweet;
