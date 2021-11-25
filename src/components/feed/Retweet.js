import React, { useState } from "react";

import { useSelector } from "react-redux";

import { Row, Col } from "reactstrap";

import Tweet from "./Tweet";
import { RetweetIcon } from "../svg/Svg";

/* 

  !bug

- There is a bug on retweet interaction bar: it doesn't update based on the information. This is caused
  by the information about the retweet being copied instead of referenced. The redux state of the tweet is indeed
  update, as can be seem on the display of the tweet, but the copy inside of the retweet is not. This is due to a 
  placeholder implementation that is very likely to change as the functions are iterated. At worst, it will be fixed
  when the code is rearranged to use a backend. It is not worth fixing now, but remember to keep an eye on it on the
  future versions to see if it is indeed fixed in the final version.

*/
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
        <Tweet tweet={tweet} user={user} toggleQuote={toggleQuote} />
      </Col>
    </Row>
  );
}

export default Retweet;
