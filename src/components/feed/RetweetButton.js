import React, { useState } from "react";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { RetweetIcon, CommentIcon } from "../svg/Svg.js";

export default function RetweetButton({
  retweeted,
  handleRetweet,
  retweets,
  toggleQuote,
}) {
  let [dropdownOpen, setDropdownOpen] = useState(false);

  return (
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
            <RetweetIcon />{" "}
            <span>{retweeted ? "Undo Retweet" : "Retweet"}</span>
          </DropdownItem>
          <DropdownItem onClick={toggleQuote}>
            <CommentIcon />
            <span> Quote Tweet</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <span aria-label="number of retweets" className="pl-2">
        {retweets}
      </span>
    </div>
  );
}
