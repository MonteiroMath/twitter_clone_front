import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectJwtToken, selectUserData } from "../../../../store/UserSlice";
import TweetDisplay from "../TweetDisplay/TweetDisplay";

//store imports
import {
  addRetweet,
  removeRetweet,
  addLike,
  deleteLike,
} from "../../../../store/tweetsSlice";


function Tweet({ tweet }) {
  let dispatch = useDispatch();
  const jwtToken = useSelector((state) => selectJwtToken(state));
  const user = useSelector((state) => selectUserData(state));

  async function handleLike() {
    let action = tweet.liked ? deleteLike : addLike;
    dispatch(action({ id: tweet.id, userId: user.id, jwtToken }));
  }

  function handleRetweet() {
    let action = tweet.retweeted ? removeRetweet : addRetweet;
    dispatch(action({ tweetId: tweet.id, userId: user.id, jwtToken }));
  }

  return (
    <TweetDisplay
      tweet={tweet}
      handleLike={handleLike}
      handleRetweet={handleRetweet}
    />
  );
}

export default Tweet;
