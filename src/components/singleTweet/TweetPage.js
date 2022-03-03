import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Row } from "reactstrap";

import user from "../../placeholders/user";

import TopBar from "../TopBar";
import TweetList from "../feed/TweetList";
import TweetCard from "../feed/TweetCard";
import CommentTweet from "../CommentTweet";

export default function TweetPage(props) {
  let { id } = useParams();

  let tweet = useSelector((state) => {
    return state.tweets.find((tweet) => tweet.id === parseInt(id));
  });

  let comments = useSelector((state) => {
    return tweet
      ? tweet.comment_ids.map((id) =>
          state.tweets.find((tweet) => tweet.id === parseInt(id))
        )
      : null;
  });

  return tweet ? (
    <div>
      <TopBar header="Tweet" />
      {tweet ? <TweetCard tweet={tweet} user={user} /> : null}
      <Row className="border p-3 d-none d-md-flex" noGutters={true}>
        <CommentTweet parent_id={parseInt(id)} />
      </Row>
      <TweetList user={user} tweetList={comments} />
    </div>
  ) : null;
}
