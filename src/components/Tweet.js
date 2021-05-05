import React from "react";

function Tweet(props) {
  let { tweet, user } = props;

  return (
    <div className="border">
      <p>
        <span class="font-weight-bold">{user.username}</span>{" "}
        <span class="text-secondary">@{user.username}</span> -
        <span class="text-secondary"> {tweet.created}</span>
      </p>
      <p>{tweet.message}</p>
      <p>
        Likes: {tweet.likes} rt: {tweet.retweets} comments: {tweet.comments}
      </p>
    </div>
  );
}

export default Tweet;
