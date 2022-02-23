import React from "react";
import { Row, Col } from "reactstrap";
import Tweet from "./Tweet";
import Retweet from "./Retweet";


function TweetCard(props) {
  let { tweet, user, toggleQuote } = props;

  return (
    <Row className="border p-3" noGutters>
      <Col xs={12}>
        {tweet.message ? (
          <Tweet
            tweet={tweet}
            user={user}
            toggleQuote={() => toggleQuote(tweet)}
          />
        ) : (
          <Retweet retweet={tweet} user={user} toggleQuote={toggleQuote} />
        )}
      </Col>
    </Row>
  );
}

export default TweetCard;
