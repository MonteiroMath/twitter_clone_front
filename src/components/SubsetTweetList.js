import React from "react";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import TweetList from "./feed/TweetList";
import { selectSomeTweets } from "../store/tweetsSlice";

function SubsetTweetList({ user, ids }) {
  const tweetStatus = useSelector((state) => state.tweets.status);
  const error = useSelector((state) => state.tweets.error);
  const tweetList = [
    ...useSelector((state) => selectSomeTweets(state, ids)),
  ].reverse();

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

export default SubsetTweetList;
