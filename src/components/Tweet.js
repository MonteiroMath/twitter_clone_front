import React from "react";
import { Container, Row, Col } from "reactstrap";
import heart from "../icons/heart.svg";
import retweet from "../icons/retweet.svg";
import comment from "../icons/comment.svg";
import avatar from "../images/phavatar.png";

function Tweet(props) {
  let { tweet, user } = props;

  //todo Extract avatar, textMessage and IconsBar into separate components
  return (
    <Col className="border m-auto" xs="12" md="10" lg="6">
      <Row>
        <Col xs="2">
          <div className="pt-3">
            <img src={avatar} alt="like icon" width="50px" />
          </div>
        </Col>
        <Col>
          <p>
            <span class="font-weight-bold">{user.username}</span>{" "}
            <span class="text-secondary">@{user.username}</span> -
            <span class="text-secondary"> {tweet.created}</span>
          </p>
          <p>{tweet.message}</p>
          <p>
            <img src={heart} alt="like icon" width="15px" />
            {tweet.likes}
            <img src={retweet} alt="like icon" width="15px" /> {tweet.retweets}
            <img src={comment} alt="like icon" width="15px" /> {tweet.comments}
          </p>
        </Col>
      </Row>
    </Col>
  );
}

export default Tweet;
