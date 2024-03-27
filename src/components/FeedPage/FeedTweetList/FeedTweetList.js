import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectJwtToken } from "../../../store/UserSlice";
import { Spinner } from "reactstrap";
import TweetList from "../../Shared/TweetList/TweetList";
import {
  selectAllTweets,
  fetchTweets,
  clearState,
} from "../../../store/tweetsSlice";

function FeedTweetList({ username }) {
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => selectJwtToken(state));

  const tweetStatus = useSelector((state) => state.tweets.status);
  const error = useSelector((state) => state.tweets.error);
  const tweetList = useSelector(selectAllTweets);

  useEffect(() => {
    
    dispatch(fetchTweets({ username, jwtToken }));

    return () => dispatch(clearState());
  }, [dispatch, jwtToken, username]);

  return (
    <>
      {tweetStatus === "fulfilled" && <TweetList tweetList={tweetList} />}
      {tweetStatus === "pending" && <Spinner color="info" />}
      {tweetStatus === "rejected" && <div>{error}</div>}
    </>
  );
}

export default FeedTweetList;
