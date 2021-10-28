import React, { useState } from "react";

import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { CommentIcon, RetweetIcon, LikeIcon, ShareIcon } from "../svg/Svg.js";

function InteractionBar(props) {
  let {
    likes,
    liked,
    retweeted,
    retweets,
    comments,
    handleLike,
    handleRetweet,
  } = props;

  let [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="d-flex pt-2 small text-secondary align-item">
      <div className="mr-3 d-flex align-items-center">
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

      <div className="mr-3 d-flex align-items-center">
        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen(!dropdownOpen)}
        >
          <DropdownToggle
            aria-label="Retweet"
            className="p-1 cnoBorder"
            color="info"
            outline
          >
            <RetweetIcon filled={retweeted} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={handleRetweet}>
              <RetweetIcon /> <span>Retweet</span>
            </DropdownItem>
            <DropdownItem>
              <CommentIcon />
              <span> Quote Tweet</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <span aria-label="number of retweets" className="pl-2">
          {retweets}
        </span>
      </div>

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

      <div className="d-flex align-items-center">
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

/*

  - Retweet tests
    - Clicking in the retweet shows the menu
    - Choosing retweet updates the retweet counter
    - Choosing Quote tweet opens the form
    - Tweeting without filling the form causes a normal retweet
    - Fiiling the form includes a new tweet at the top of the feed

*/

export default InteractionBar;
