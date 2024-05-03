import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { client } from "../../api/client";

import { useSelector } from "react-redux";
import { selectJwtToken } from "../../store/UserSlice";
import FollowsDisplay from "./FollowsDisplay/FollowsDisplay";

function FollowersPage() {
  let { username } = useParams();

  const [loadingState, setLoadingState] = useState("idle");
  const [userList, setUserList] = useState([]);

  const jwtToken = useSelector((state) => selectJwtToken(state));

  useEffect(() => {
    setLoadingState("loading");

    client.getFollowers(username, jwtToken).then((result) => {
      if (result.success) {
        setUserList(result.followers);
        setLoadingState("success");
      } else {
        setLoadingState("failed");
      }
    });
  }, [username, jwtToken]);

  return (
    <FollowsDisplay
      username={username}
      userList={userList}
      loadingState={loadingState}
    />
  );
}

export default FollowersPage;
