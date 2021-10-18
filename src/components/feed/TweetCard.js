import React from "react";
import { Row, Col } from "reactstrap";
import Tweet from "./Tweet";
import Retweet from "./Retweet";

function TweetCard(props) {
  let { tweet, user } = props;

  return (
    <Row className="border p-3" noGutters>
      <Col xs={12}>
        {tweet.tweet ? (
          <Retweet retweet={tweet} user={user} />
        ) : (
          <Tweet tweet={tweet} user={user} />
        )}
      </Col>
    </Row>
  );
}

export default TweetCard;
