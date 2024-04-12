import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { Row, Spinner } from "reactstrap";
import { selectJwtToken, selectUserData } from "../../store/UserSlice";
import {
  fetchTweetWithAnswers,
  selectTweetById,
  selectAnswers,
  clearState,
} from "../../store/tweetsSlice";

import MainLayout from "../MainLayout/MainLayout";
import TopBar from "../Shared/Bars/TopBar/TopBar";
import SubsetTweetList from "./SubsetTweetList/SubsetTweetList";
import AnswerTweetForm from "../Shared/Forms/AnswerTweetForm/AnswerTweetForm";

import TweetCard from "../Shared/TweetCard/TweetCard";

export default function TweetPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const jwtToken = useSelector((state) => selectJwtToken(state));
  const user = useSelector((state) => selectUserData(state));
  const reqStatus = useSelector((state) => state.tweets.status);
  const error = useSelector((state) => state.tweets.error);

  let tweet = useSelector((state) => selectTweetById(state, parseInt(id)));
  let answers = useSelector((state) => selectAnswers(state));

  useEffect(() => {
    dispatch(
      fetchTweetWithAnswers({ parentId: id, userId: user.id, jwtToken })
    );

    return () => dispatch(clearState());
  }, [dispatch, id, jwtToken, user.id]);

  return tweet ? (
    <MainLayout>
      {reqStatus === "pending" && <Spinner color="info" />}
      {reqStatus === "fulfilled" && (
        <div>
          <TopBar header="Tweet" />
          {tweet ? <TweetCard tweet={tweet} user={user} /> : null}
          <Row className="border p-3 d-none d-md-flex" noGutters={true}>
            <AnswerTweetForm parent_id={id} />
          </Row>
          <SubsetTweetList user={user} tweetList={answers} />
        </div>
      )}
      {reqStatus === "rejected" && <div>{error}</div>}
    </MainLayout>
  ) : null;
}
