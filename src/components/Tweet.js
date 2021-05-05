import React from "react";

function Tweet(props) {
  let { tweet } = props;

  return <div>
    {tweet.message}
  </div>;
}

export default Tweet;
