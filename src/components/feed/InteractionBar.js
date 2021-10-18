import React from "react";

import { Button } from "reactstrap";

import { CommentIcon, RetweetIcon, LikeIcon, ShareIcon } from "../svg/Svg.js";

function InteractionBar(props) {
  let { likes, liked, retweets, comments, handleLike } = props;

  return (
    <div className="d-flex pt-2 small text-secondary">
      <div className="mr-5 d-flex align-items-center">
        <Button
          aria-label="Comment tweet"
          className="p-1 cnoBorder"
          color="info"
          outline
        >
          <CommentIcon />
        </Button>

        <span aria-label="number of comments" className="pl-2">
          {comments}
        </span>
      </div>

      <div className="mr-5">
        <Button
          aria-label="Retweet"
          className="p-1 cnoBorder"
          color="info"
          outline
        >
          <RetweetIcon />
        </Button>
        <span aria-label="number of retweets" className="pl-2">
          {retweets}
        </span>
      </div>

      <div className="mr-5">
        <Button
          aria-label="Like tweet"
          className="p-1 cnoBorder"
          color="info"
          outline
          onClick={handleLike}
        >
          <LikeIcon filled={liked} />
        </Button>
        <span aria-label="number of likes" className="pl-2">
          {likes}
        </span>
      </div>

      <div>
        <Button
          aria-label="Share tweet"
          className="p-1 cnoBorder"
          color="info"
          outline
        >
          <ShareIcon />
        </Button>
      </div>
    </div>
  );
}

export default InteractionBar;
