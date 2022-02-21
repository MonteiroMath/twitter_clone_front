import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function TweetPage(props) {
  let { id } = useParams();

  let tweet = useSelector((state) => {
    console.log(state);
    return state.tweets.find((tweet) => tweet.id === id);
  });

  return <div>{tweet}</div>;
}
