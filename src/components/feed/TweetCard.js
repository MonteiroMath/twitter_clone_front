import React from "react";
import { Row, Col } from "reactstrap";
import Tweet from "./Tweet";
import Retweet from "./Retweet";
import { Link } from "react-router-dom";

function TweetCard(props) {
  let { tweet, user, toggleQuote } = props;

  return (
    <Link to={`/${tweet.id}`}>
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
    </Link>
  );
}

export default TweetCard;
