import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "reactstrap";

import { client } from "../../api/client";

import MainLayout from "../MainLayout/MainLayout";
import { useSelector } from "react-redux";
import { selectJwtToken } from "../../store/UserSlice";
import FollowerCard from "./FollowerCard/FollowerCard";
import FollowersButtonGroup from "./FollowersButtonGroup/FollowersButtonGroup";

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
    <MainLayout>
      <div>Nav bar</div>
      <FollowersButtonGroup className="my-4"/>
      <div>
        {loadingState === "loading" && (
          <div className="d-flex justify-content-center">
            <Spinner color="info" />
          </div>
        )}

        {loadingState === "success" && (
          <>
            {userList.map((follower) => (
              <FollowerCard follower={follower} />
            ))}
          </>
        )}

        {loadingState === "failed" && (
          <div className="d-flex justify-content-center cfs-30 cfw-bold">
            Something went wrong!
          </div>
        )}
      </div>
    </MainLayout>
  );
  /* 
  return (
    
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
  */
}

export default FollowersPage;
