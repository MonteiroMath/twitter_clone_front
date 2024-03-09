import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min.js";
import { Row } from "reactstrap";

import { selectJwtToken } from "../../store/UserSlice.js";

import MainLayout from "../MainLayout/MainLayout.js";
import NewTweet from "../Shared/NewTweet/NewTweet.js";
import TopBar from "./TopBar/TopBar.js";

function NewTweetPage() {
  const jwtToken = useSelector((state) => selectJwtToken(state));

  return jwtToken ? (
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
  ) : (
    <Redirect to="/" />
  );
}

export default NewTweetPage;
