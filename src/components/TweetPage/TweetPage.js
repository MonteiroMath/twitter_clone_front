import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { selectJwtToken } from "../../store/UserSlice";
import { selectTweetById } from "../../store/tweetsSlice";
import { Row } from "reactstrap";

import MainLayout from "../MainLayout/MainLayout";
import TopBar from "../Shared/Bars/TopBar/TopBar";
import SubsetTweetList from "./SubsetTweetList/SubsetTweetList";
import AnswerTweetForm from "../Shared/Forms/AnswerTweetForm/AnswerTweetForm";

import TweetCard from "../Shared/TweetCard/TweetCard";
import { fetchAnswers, selectAnswers, closePage } from "../../store/PageSlice";

import user from "../../assets/placeholders/user";

export default function TweetPage(props) {
  const jswToken = useSelector((state) => selectJwtToken(state));

  const dispatch = useDispatch();
  const pageStatus = useSelector((state) => state.page.status);
  let { id } = useParams();

  let tweet = useSelector((state) => selectTweetById(state, parseInt(id)));

  const tweetList = [...useSelector((state) => selectAnswers(state))].reverse();

  useEffect(() => {
    if (pageStatus === "idle") {
      dispatch(fetchAnswers({ parentId: id, userId: user.id }));
    }

    return () => dispatch(closePage());
  }, [dispatch]);

  return jswToken ? (
    tweet ? (
      <MainLayout>
        <div>
          <TopBar header="Tweet" />
          {tweet ? <TweetCard tweet={tweet} user={user} /> : null}
          <Row className="border p-3 d-none d-md-flex" noGutters={true}>
            <AnswerTweetForm parent_id={id} />
          </Row>
          <SubsetTweetList user={user} tweetList={tweetList} />
        </div>
      </MainLayout>
    ) : null
  ) : (
    <Redirect to="/" />
  );
}
