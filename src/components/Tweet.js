import React from "react";
import { Row, Col } from "reactstrap";

import Avatar from "./Avatar";
import InteractionBar from "./InteractionBar";

function Tweet(props) {
  let { tweet, user } = props;

  //todo Extract avatar, textMessage and IconsBar into separate components
  return (
    <Col className="border m-auto" xs="12" md="10" lg="6">
      <Row>
        <Col xs="2">
          <Avatar />
        </Col>
        <Col>
          <p>
            <span class="font-weight-bold">{user.username}</span>{" "}
            <span class="text-secondary">@{user.username}</span> -
            <span class="text-secondary"> {tweet.created}</span>
          </p>
          <p>{tweet.message}</p>
          <InteractionBar
            likes={tweet.likes}
            retweets={tweet.retweets}
            comments={tweet.comments}
          />
        </Col>
      </Row>
    </Col>
  );
}

export default Tweet;
