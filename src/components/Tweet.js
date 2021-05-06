import React from "react";
import { Row, Col } from "reactstrap";

import Avatar from "./Avatar";
import InfoBar from "./InfoBar";
import Message from "./Message";
import InteractionBar from "./InteractionBar";

function Tweet(props) {
  let { tweet, user } = props;

  //todo Extract avatar, textMessage and IconsBar into separate components
  return (
    <Col className="border m-auto p-2" xs="12" md="10" lg="6">
      <Row>
        <Col xs="2">
          <Avatar />
        </Col>
        <Col>
          <InfoBar username={user.username} created={tweet.created} />
          <Message message={tweet.message} />
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