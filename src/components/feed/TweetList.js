import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../store/actions";

import TweetCard from "./TweetCard";

function TweetList(props) {
  const { user, toggleQuote } = props;
  const dispatch = useDispatch();

  const tweets = [...useSelector((state) => state.tweets)].reverse();

  useEffect(() => dispatch({ type: ACTIONS.INIT }), []);

  return (
    <ul className="mt-3 p-0">
      {tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          user={user}
          toggleQuote={toggleQuote}
        />
      ))}
    </ul>
  );
}

export default TweetList;
