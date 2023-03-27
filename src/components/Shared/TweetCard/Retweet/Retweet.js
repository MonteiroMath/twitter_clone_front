import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "reactstrap";

import { selectTweetById } from "../../../../store/tweetsSlice";
import { client } from "../../../../api/client";

import Tweet from "../Tweet/Tweet";
import { RetweetIcon } from "../../Svg/Svg";

function Retweet({ tweet, user }) {
  const cachedReference = useSelector((state) =>
    selectTweetById(state, tweet.referenceId)
  );

  const [referenceTweet, setReferenceTweet] = useState(cachedReference || null);

  useEffect(() => {
    if (!referenceTweet) {
      client
        .getTweet(tweet.id, user.id)
        .then((tweet) => setReferenceTweet(tweet))
        .catch(console.log);
    }
  }, [referenceTweet, setReferenceTweet, tweet.id, user.id]);

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
        <Tweet tweet={referenceTweet} user={user} />
      </Col>
    </Row>
  );
}

export default Retweet;
