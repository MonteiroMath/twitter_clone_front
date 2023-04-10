import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "reactstrap";

import { selectTweetById } from "../../../../store/tweetsSlice";
import { client } from "../../../../api/client";

import Tweet from "../Tweet/Tweet";
import { RetweetIcon } from "../../Svg/Svg";

/*
  Probably can't reutilize Tweet Component logic fully:
    - Tweet Component logic might be reusable if reference is present in state, but not otherwise
    - Local state solution doesn't allow for perfect syncronization - more than one source of truth
    - think about employing two modes of operation:
      - one for when the original tweet is not on the state
      - one for when the original tweet is in the state
      - if the original tweet comes into state, it should start being used. Ideally, seamlessly

    - When the reference tweet is not in state, it will not be updated with likes and other data
    
*/

function Retweet({ tweet, user }) {
  const cachedReference = useSelector((state) =>
    selectTweetById(state, tweet.referenceId)
  );

  const [referenceTweet, setReferenceTweet] = useState(cachedReference);

  useEffect(() => {
    if (!cachedReference) {
      client
        .getTweet(tweet.id, user.id)
        .then((tweet) => setReferenceTweet(tweet))
        .catch(console.log);
    } else {
      setReferenceTweet(cachedReference);
    }
  }, [cachedReference, setReferenceTweet, tweet.id, user.id]);

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
