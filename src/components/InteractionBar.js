import React from "react";
import heart from "../icons/heart.svg";
import retweet from "../icons/retweet.svg";
import comment from "../icons/comment.svg";

function InteractionBar(props) {
  let { likes, retweets, comments } = props;

  return (
    <div>
      <img src={heart} alt="like icon" width="15px" />
      {likes}
      <img src={retweet} alt="like icon" width="15px" /> {retweets}
      <img src={comment} alt="like icon" width="15px" /> {comments}
    </div>
  );
}

export default InteractionBar;
