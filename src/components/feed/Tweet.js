import React from "react";
import { Row, Col } from "reactstrap";

import Avatar from "../Avatar";
import InfoBar from "../InfoBar";
import Message from "../Message";
import Attachment from "../Attachment";
import Poll from "./Poll";
import InteractionBar from "../InteractionBar";

function Tweet(props) {
  let { tweet, user } = props;

  return (
    <Row className="border p-3" noGutters={true}>
      <Col xs="2" md="1">
        <Avatar />
      </Col>
      <Col className="ml-2 ml-md-3">
        <InfoBar username={user.username} created={tweet.created} />
        <Message message={tweet.message} />
        <Attachment url={tweet.attach} />
        <Poll
          poll={tweet.poll}
          pollSettings={tweet.pollSettings}
          start={tweet.created}
        />
        <InteractionBar
          likes={tweet.likes}
          retweets={tweet.retweets}
          comments={tweet.comments}
        />
      </Col>
    </Row>
  );
}

export default Tweet;
