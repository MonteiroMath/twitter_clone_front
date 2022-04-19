import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "reactstrap";

import NewTweet from "../newTweet/NewTweet";

import FeedNavbar from "./FeedNavbar";
import TweetList from "./TweetList";
import NewTweetButton from "./NewTweetButton";
import BottomBar from "./BottomBar";

import { selectAllTweets, fetchTweets } from "../../store/tweetsSlice";
import userData from "../../placeholders/user";

function Feed(props) {
  let [user, setUser] = useState({});
  const dispatch = useDispatch();

  const tweetStatus = useSelector((state) => state.tweets.status);
  const tweetList = [...useSelector(selectAllTweets)].reverse();

  useEffect(() => {
    setUser(userData);
    if (tweetStatus === "idle") {
      dispatch(fetchTweets(1));
    }
  }, []);

  console.log(tweetStatus);
  return (
    <div>
      <Row className="sticky-top border bg-white" noGutters>
        <FeedNavbar />
      </Row>
      <Row className="border p-3 d-none d-md-flex" noGutters={true}>
        <NewTweet />
      </Row>
      <TweetList user={user} tweetList={tweetList} />
      <NewTweetButton />
      <BottomBar />
    </div>
  );
}

export default Feed;
