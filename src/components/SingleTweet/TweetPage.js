import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectTweetById } from "../../store/tweetsSlice";
import { Row } from "reactstrap";

import user from "../../assets/placeholders/user";

import TopBar from "../Shared/TopBar/TopBar";
import SubsetTweetList from "../SubsetTweetList/SubsetTweetList";
import CommentTweet from "../CommentTweet/CommentTweet";

import TweetCard from "../Shared/TweetCard/TweetCard";
import { fetchAnswers, selectAnswers, closePage } from "../../store/PageSlice";

export default function TweetPage(props) {
  const dispatch = useDispatch();
  const pageStatus = useSelector((state) => state.page.status);
  let { id } = useParams();

  let tweet = useSelector((state) => selectTweetById(state, parseInt(id)));

  const tweetList = [...useSelector((state) => selectAnswers(state))].reverse();

  useEffect(() => {
    if (pageStatus === "idle") {
      dispatch(fetchAnswers(id));
    }

    return () => dispatch(closePage());
  }, [dispatch]);

  return tweet ? (
    <div>
      <TopBar header="Tweet" />
      {tweet ? <TweetCard tweet={tweet} user={user} /> : null}
      <Row className="border p-3 d-none d-md-flex" noGutters={true}>
        <CommentTweet parent_id={parseInt(id)} />
      </Row>
      <SubsetTweetList user={user} tweetList={tweetList} />
    </div>
  ) : null;
}
