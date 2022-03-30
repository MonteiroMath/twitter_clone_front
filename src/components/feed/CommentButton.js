import React from "react";

import { Button } from "reactstrap";

import { CommentIcon } from "../svg/Svg.js";

export default function CommentButton({ comments, toggle }) {
  return (
    <div className="mr-3 d-flex align-items-center">
      <Button
        aria-label="Comment tweet"
        className="p-1 cnoBorder"
        color="info"
        outline
        onClick={toggle}
      >
        <CommentIcon />
      </Button>

      <span aria-label="number of comments" className="pl-2">
        {comments}
      </span>
    </div>
  );
}
