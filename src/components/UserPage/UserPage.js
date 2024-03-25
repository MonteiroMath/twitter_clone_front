import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "reactstrap";

import { client } from "../../api/client";

import MainLayout from "../MainLayout/MainLayout";
import UserProfile from "./UserProfile/UserProfile";
import FeedTweetList from "../FeedPage/FeedTweetList/FeedTweetList";
import { selectJwtToken } from "../../store/UserSlice";
import { useSelector } from "react-redux";
import useTweetLoader from "../../hooks/useTweetLoader";

function UserPage() {
  let { username } = useParams();
  const jwtToken = useSelector((state) => selectJwtToken(state));

  //user State
  const [loadingState, setLoadingState] = useState("idle");
  const [user, setUser] = useState({});

  //tweet State
  const [tweetList, error, reqStatus] = useTweetLoader(username, jwtToken);

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
          <FeedTweetList
            status={reqStatus}
            tweetList={tweetList}
            error={error}
          />
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
