import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { client } from "../../api/client";

import { useSelector } from "react-redux";
import { selectJwtToken } from "../../store/UserSlice";
import FollowsDisplay from "./FollowsDisplay/FollowsDisplay";

function FollowsPage({ shouldFetchFollowers }) {
  let { username } = useParams();

  const [loadingState, setLoadingState] = useState("idle");
  const [userList, setUserList] = useState([]);

  const jwtToken = useSelector((state) => selectJwtToken(state));

  useEffect(() => {
    setLoadingState("loading");

    const fetchPromise = shouldFetchFollowers
      ? client.getFollowers(username, jwtToken)
      : client.getFollowing(username, jwtToken);

    fetchPromise.then((result) => {
      if (result.success) {
        setUserList(shouldFetchFollowers ? result.followers : result.followed);
        setLoadingState("success");
      } else {
        setLoadingState("failed");
      }
    });
  }, [username, jwtToken, shouldFetchFollowers]);

  return (
    <FollowsDisplay
      username={username}
      userList={userList}
      loadingState={loadingState}
    />
  );
}

export default FollowsPage;
