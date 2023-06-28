import React from "react";
import { useDispatch } from "react-redux";
import TweetDisplay from "../TweetDisplay/TweetDisplay";

//store imports
import {
  addRetweet,
  removeRetweet,
  addLike,
  deleteLike,
} from "../../../../store/tweetsSlice";

function Tweet({ tweet, user, originalId }) {
  let dispatch = useDispatch();

  async function handleLike() {
    let action = tweet.liked ? deleteLike : addLike;
    dispatch(action({ id: tweet.id, userId: user.id }));
  }

  function handleRetweet() {
    let action = tweet.retweeted ? removeRetweet : addRetweet;

    dispatch(action({ tweetId: tweet.id, userId: user.id }));
  }

  return (
    <TweetDisplay
      tweet={tweet}
      user={user}
      handleLike={handleLike}
      handleRetweet={handleRetweet}
    />
  );
}

export default Tweet;
