import React from "react";
import { Row, Col } from "reactstrap";
import Tweet from "./Tweet/Tweet";
import Retweet from "./Retweet/Retweet";

function TweetCard(props) {
  let { tweet, user } = props;

  console.log(tweet.type);

  return (
    <Row className="border p-3" noGutters>
      <Col xs={12}>
        {tweet.type === "retweet" ? (
          <Retweet>
            <Tweet tweet={tweet} user={user} originalId={tweet.referenceId} />
          </Retweet>
        ) : (
          <Tweet tweet={tweet} user={user} originalId={tweet.id} />
        )}
      </Col>
    </Row>
  );
}

export default TweetCard;
