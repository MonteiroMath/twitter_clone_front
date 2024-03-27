import React from "react";
import { Row, Col } from "reactstrap";
import Tweet from "./Tweet/Tweet";
import Retweet from "./Retweet/Retweet";

function TweetCard(props) {
  let { tweet } = props;

  return (
    <Row className="border p-3" noGutters>
      <Col xs={12}>
        {tweet.type === "retweet" ? (
          <Retweet tweet={tweet} />
        ) : (
          <Tweet tweet={tweet} />
        )}
      </Col>
    </Row>
  );
}

export default TweetCard;
