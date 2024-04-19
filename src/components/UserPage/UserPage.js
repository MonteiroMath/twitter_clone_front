import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "reactstrap";

import { client } from "../../api/client";

import MainLayout from "../MainLayout/MainLayout";
import UserProfile from "./UserProfile/UserProfile";
import FeedTweetList from "../FeedPage/FeedTweetList/FeedTweetList";
import { useSelector } from "react-redux";
import { selectJwtToken } from "../../store/UserSlice";

function UserPage() {
  let { username } = useParams();

  const [loadingState, setLoadingState] = useState("idle");
  const [user, setUser] = useState({});

  const jwtToken = useSelector((state) => selectJwtToken(state));

  useEffect(() => {
    setLoadingState("loading");
    client.getUserData(username, jwtToken).then((result) => {
      if (result.success) {
        setUser(result.user);
        setLoadingState("success");
      } else {
        setLoadingState("failed");
      }
    });
  }, [username, jwtToken]);

  function handleFollow() {
    const { isFollowed } = user;
    const action = isFollowed ? client.unfollow : client.follow;

    action(user.id, jwtToken).then((result) => {
      if (result.success) {
        setUser(result.user);
      }
    });
  }

  return (
    <MainLayout>
      {loadingState === "loading" && (
        <div className="d-flex justify-content-center">
          <Spinner color="info" />
        </div>
      )}

      {loadingState === "success" && (
        <>
          <UserProfile user={user} handleFollow={handleFollow} />
          <FeedTweetList username={username} />
        </>
      )}

      {loadingState === "failed" && (
        <div className="d-flex justify-content-center cfs-30 cfw-bold">
          Something went wrong!
        </div>
      )}
    </MainLayout>
  );
}

export default UserPage;
