import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Row } from "reactstrap";

import user from "../../placeholders/user";

import TopBar from "../TopBar";
import TweetList from "../feed/TweetList";
import TweetCard from "../feed/TweetCard";
import NewTweet from "../newTweet/NewTweet";

export default function TweetPage(props) {
  let { id } = useParams();

  let tweet = useSelector((state) => {
    return state.tweets.find((tweet) => tweet.id === parseInt(id));
  });

  let comments = useSelector((state) => {
    return tweet.comment_ids.map((id) =>
      state.tweets.find((tweet) => tweet.id === parseInt(id))
    );
  });


  return (
    <div>
      <TopBar header="Tweet" />
      {tweet ? <TweetCard tweet={tweet} user={user} /> : null}
      <Row className="border p-3 d-none d-md-flex" noGutters={true}>
        <NewTweet />
      </Row>
      <TweetList user={user} tweetList={comments} />
    </div>
  );
}
