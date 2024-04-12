import React from "react";

import { Row } from "reactstrap";

import MainLayout from "../MainLayout/MainLayout.js";
import NewTweet from "../Shared/NewTweet/NewTweet.js";
import TopBar from "./TopBar/TopBar.js";

function NewTweetPage() {
  return (
    <MainLayout>
      <div>
        <Row noGutters={true}>
          <TopBar />
        </Row>
        <Row className="mx-2 mt-3" noGutters={true}>
          <NewTweet />
        </Row>
      </div>
    </MainLayout>
  );
}

export default NewTweetPage;
