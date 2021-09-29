import React, { useEffect, useState } from "react";

import { Row } from "reactstrap";

import NewTweet from "../newTweet/NewTweet";

import FeedNavbar from "./FeedNavbar";
import TweetList from "./TweetList";
import NewTweetButton from "./NewTweetButton";
import BottomBar from "./BottomBar";

import userData from "../../placeholders/user";

//todo with the introduction of redux, Feed lost sense as a control comp
//todo With the introduction of router, mobile display needs changed
//todo Change feed into a display comp, bringing out the layout settings

function Feed(props) {
  let [user, setUser] = useState({});

  useEffect(() => {
    setUser(userData);
  }, []);

  return (
    <div>
      <FeedNavbar />
      <Row className="border p-3 d-none d-md-flex" noGutters={true}>
        <NewTweet />
      </Row>
      <TweetList user={user} />
      <NewTweetButton />
      <BottomBar />
    </div>
  );
}

export default Feed;
