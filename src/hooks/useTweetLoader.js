import { useState, useEffect } from "react";
import { client } from "../api/client";

export default function useTweetLoader(username, jwtToken) {
  //tweet State
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

  return [tweetList, error, reqStatus];
}
