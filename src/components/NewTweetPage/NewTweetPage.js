import React from "react";
import { Row } from "reactstrap";

import NewTweet from "../NewTweet/NewTweet.js";
import TopBar from "./TopBar/TopBar.js";

function NewTweetPage() {
  return (
    <div>
      <Row noGutters={true}>
        <TopBar />
      </Row>
      <Row className="mx-2 mt-3" noGutters={true}>
        <NewTweet />
      </Row>
    </div>
  );
}

export default NewTweetPage;