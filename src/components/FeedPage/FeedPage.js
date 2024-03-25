import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { Row } from "reactstrap";

import { selectJwtToken, selectUserData } from "../../store/UserSlice";

import MainLayout from "../MainLayout/MainLayout";
import FeedNavbar from "./Navbar/FeedNavbar";
import FeedTweetList from "./FeedTweetList/FeedTweetList";
import BottomBar from "./BottomBar/BottomBar";
import NewTweet from "../Shared/NewTweet/NewTweet";
import NewTweetButton from "../Shared//Buttons/NewTweetButton/NewTweetButton";

function Feed() {
  const jwtToken = useSelector((state) => selectJwtToken(state));
  const user = useSelector((state) => selectUserData(state));

  return jwtToken ? (
    <MainLayout>
      <div>
        <Row className="sticky-top border bg-white" noGutters>
          <FeedNavbar />
        </Row>
        <Row className="border p-3 d-none d-md-flex" noGutters={true}>
          <NewTweet />
        </Row>
        <FeedTweetList username={user.username} />
        <NewTweetButton />
        <BottomBar />
      </div>
    </MainLayout>
  ) : (
    <Redirect to="/" />
  );
}

export default Feed;
