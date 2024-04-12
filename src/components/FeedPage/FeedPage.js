import React from "react";
import { useSelector } from "react-redux";
import { Row } from "reactstrap";

import { selectUserData } from "../../store/UserSlice";

import MainLayout from "../MainLayout/MainLayout";
import FeedNavbar from "./Navbar/FeedNavbar";
import FeedTweetList from "./FeedTweetList/FeedTweetList";
import BottomBar from "./BottomBar/BottomBar";
import NewTweet from "../Shared/NewTweet/NewTweet";
import NewTweetButton from "../Shared//Buttons/NewTweetButton/NewTweetButton";

function Feed() {
  const user = useSelector((state) => selectUserData(state));

  return (
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
  );
}

export default Feed;
