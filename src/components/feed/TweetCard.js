import React from "react";
import { Row, Col } from "reactstrap";
import Tweet from "./Tweet";
import Retweet from "./Retweet";

function TweetCard(props) {
  let { tweet, user } = props;

  return (
    <Row className="border p-3" noGutters>
      <Col xs={12}>
        {tweet.retweet === 0 ? (
          <Tweet tweet={tweet} user={user} originalId={tweet.id} />
        ) : (
          <Retweet>
            <Tweet tweet={tweet} user={user} originalId={tweet.original} />
          </Retweet>
        )}
      </Col>
    </Row>
  );
}

export default TweetCard;
