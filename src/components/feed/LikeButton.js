import React from "react";

import { Button } from "reactstrap";

import { LikeIcon } from "../svg/Svg.js";

export default function LikeButton({ handleLike, liked, likes }) {
  return (
    <div className="mr-3 d-flex align-items-center">
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
  );
}
