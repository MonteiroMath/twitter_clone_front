import React from "react";

import LikeButton from "./Buttons/LikeButton";
import ShareButton from "./Buttons/ShareButton.js";
import RetweetButton from "./Buttons/RetweetButton.js";
import CommentButton from "./Buttons/CommentButton.js";

function InteractionBar(props) {
  let {
    likes,
    liked,
    retweeted,
    retweets,
    answers,
    handleLike,
    handleRetweet,
    toggleQuote,
    toggleAnswer,
  } = props;

  return (
    <div className="d-flex pt-2 small text-secondary align-item">
      <CommentButton answers={answers} toggle={toggleAnswer} />
      <RetweetButton
        retweeted={retweeted}
        handleRetweet={handleRetweet}
        retweets={retweets}
        toggleQuote={toggleQuote}
      />
      <LikeButton handleLike={handleLike} liked={liked} likes={likes} />
      <ShareButton />
    </div>
  );
}

export default InteractionBar;
