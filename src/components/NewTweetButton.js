import React from "react";
import { Button } from "reactstrap";

function NewTweetButton({ handleNewTweet }) {
  return (
    <Button
      className="d-sm-none cstickyButton"
      color="info"
      onClick={handleNewTweet}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-vector-pen"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"
          />
          <path
            fillRule="evenodd"
            d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"
          />
        </svg>
      </div>
    </Button>
  );
}

export default NewTweetButton;
