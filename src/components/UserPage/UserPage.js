import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "reactstrap";

import { client } from "../../api/client";

import MainLayout from "../MainLayout/MainLayout";
import UserProfile from "./UserProfile/UserProfile";
import FeedTweetList from "../FeedPage/FeedTweetList/FeedTweetList";

function UserPage() {
  let { username } = useParams();

  const [loadingState, setLoadingState] = useState("idle");
  const [user, setUser] = useState({});

  useEffect(() => {
    setLoadingState("loading");
    client.getUserData(username).then((result) => {
      if (result.success) {
        setUser(result.user);
        setLoadingState("success");
      } else {
        setLoadingState("failed");
      }
    });
  }, [username]);

  return (
    <MainLayout>
      {loadingState === "loading" && (
        <div className="d-flex justify-content-center">
          <Spinner color="info" />
        </div>
      )}

      {loadingState === "success" && (
        <>
          <UserProfile user={user} />
          <FeedTweetList username={user.username} />
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
