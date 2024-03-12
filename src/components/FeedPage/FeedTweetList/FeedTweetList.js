import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectJwtToken, selectUserData } from "../../../store/UserSlice";
import { Spinner } from "reactstrap";
import TweetList from "../../Shared/TweetList/TweetList";
import { selectAllTweets, fetchTweets } from "../../../store/tweetsSlice";

function FeedTweetList() {
  const user = useSelector((state) => selectUserData(state));
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => selectJwtToken(state));

  const tweetStatus = useSelector((state) => state.tweets.status);
  const error = useSelector((state) => state.tweets.error);
  const tweetList = useSelector(selectAllTweets);

  useEffect(() => {
    if (tweetStatus === "idle") {
      dispatch(fetchTweets(user.id, jwtToken));
    }
  }, [dispatch, tweetStatus, jwtToken, user.id]);

  let content = null;

  if (tweetStatus === "fulfilled") {
    content = <TweetList tweetList={tweetList} />;
  } else if (tweetStatus === "pending") {
    content = <Spinner color="info" />;
  } else if (tweetStatus === "rejected") {
    content = <div>{error}</div>;
  }

  return content;
}

export default FeedTweetList;
