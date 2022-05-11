import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import TweetList from "./TweetList";
import { selectAllTweets, fetchTweets } from "../../store/tweetsSlice";

function FeedTweetList({ user }) {
  const dispatch = useDispatch();

  const tweetStatus = useSelector((state) => state.tweets.status);
  const error = useSelector((state) => state.tweets.error);
  const tweetList = useSelector(selectAllTweets);

  useEffect(() => {
    if (tweetStatus === "idle") {
      dispatch(fetchTweets(1));
    }
  }, [dispatch, tweetStatus]);

  let content = null;

  if (tweetStatus === "fullfiled") {
    content = <TweetList user={user} tweetList={tweetList} />;
  } else if (tweetStatus === "pending") {
    content = <Spinner color="info" />;
  } else if (tweetStatus === "rejected") {
    content = <div>{error}</div>;
  }

  return content;
}

export default FeedTweetList;
