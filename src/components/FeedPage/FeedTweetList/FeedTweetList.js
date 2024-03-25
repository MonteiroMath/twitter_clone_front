import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectJwtToken } from "../../../store/UserSlice";
import { Spinner } from "reactstrap";
import TweetList from "../../Shared/TweetList/TweetList";
import { client } from "../../../api/client";

function FeedTweetList({ username }) {
  const jwtToken = useSelector((state) => selectJwtToken(state));

  const [tweetList, setTweetList] = useState([]);
  const [error, setError] = useState(null);
  const [reqStatus, setReqStatus] = useState("idle");

  useEffect(() => {
    if (reqStatus === "idle") {
      setReqStatus("loading");
      client
        .getTweetsByUsername(username, jwtToken)
        .then((res) => {
          if (res.success) {
            setReqStatus("fulfilled");
            setTweetList(res.tweets);
          } else {
            throw new Error(res.msg);
          }
        })
        .catch((err) => {
          setReqStatus("failed");
          setError(err.message);
        });
    }
  }, [reqStatus, username, jwtToken]);

  return (
    <>
      {reqStatus === "fulfilled" && <TweetList tweetList={tweetList} />}
      {reqStatus === "loading" && <Spinner color="info" />}
      {reqStatus === "failed" && <div>{error}</div>}
    </>
  );
}

export default FeedTweetList;
