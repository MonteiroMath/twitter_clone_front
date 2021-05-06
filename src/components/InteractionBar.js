import React from "react";
import heart from "../icons/heart.svg";
import retweet from "../icons/retweet.svg";
import comment from "../icons/comment.svg";
import share from "../icons/share.svg";

function InteractionBar(props) {
  let { likes, retweets, comments } = props;

  return (
    <div className="d-flex pt-2">
      <div className="mr-5">
        <img src={comment} alt="like icon" width="15px" />
        <span> &nbsp;{comments}</span>
      </div>

      <div className="mr-5">
        <img src={retweet} alt="like icon" width="15px" />
        <span> &nbsp;{retweets}</span>
      </div>

      <div className="mr-5">
        <img src={heart} alt="like icon" width="15px" />
        <span> &nbsp;{likes}</span>
      </div>

      <div>
        <img src={share} alt="share icon" width="15px" />
      </div>
    </div>
  );
}

export default InteractionBar;
