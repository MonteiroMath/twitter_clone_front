import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";

import {
  addRetweet,
  removeRetweet,
  selectTweetById,
  fetchReference,
  addLikeRt,
  deleteLikeRt,
} from "../../../../store/tweetsSlice";

import TweetDisplay from "../TweetDisplay/TweetDisplay";
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

    plan: 
      - Reweet comes populated with its own reference tweet
      - System tries to get a reference in memory
        - if reference is in memory, use it as the source of true
          - handle like will use its id, it will get updated and everything should work fine
        - if reference is not in memory, use the populated info as source of true
          - handle like will use the RetweetId and the ReferenceId to dispatch a likeRetweet specific action
          - if it succeeds, the store will update the RETWEET with a new populated version
          - will need a new endpoint for it

    -problem: the reference inside the RETWEET must be populated - changes to BE.
*/

function Retweet({ tweet, user }) {
  let dispatch = useDispatch();

  const cachedReference = useSelector((state) =>
    selectTweetById(state, tweet.referenceId)
  );

  useEffect(() => {
    if (!cachedReference) {
      dispatch(fetchReference({ tweetId: tweet.id, userId: user.id }));
    }
  }, [tweet.id, user.id, cachedReference, dispatch]);

  let referenceTweet = cachedReference || tweet.reference;

  async function handleLike() {
    console.log(referenceTweet.liked);
    let action = referenceTweet.liked ? deleteLikeRt : addLikeRt;
    dispatch(action({ tweetId: tweet.id, userId: user.id }));
  }

  function handleRetweet() {
    let action = referenceTweet.retweeted ? removeRetweet : addRetweet;

    dispatch(action({ tweetId: tweet.referenceId, userId: user.id }));
  }

  return referenceTweet ? (
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
        <TweetDisplay
          tweet={referenceTweet}
          user={user}
          handleLike={handleLike}
          handleRetweet={handleRetweet}
        />
      </Col>
    </Row>
  ) : null;
}

export default Retweet;
