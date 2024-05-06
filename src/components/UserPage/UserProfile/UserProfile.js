import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Spinner } from "reactstrap";
import { IoIosLink } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";

import placeholderBg from "../../../assets/images/bgplaceholder.gif";
import Avatar from "../../Shared/Avatar/Avatar";
import { selectUserData, selectJwtToken } from "../../../store/UserSlice";
import { client } from "../../../api/client";

function UserProfile({ username }) {
  const [loadingState, setLoadingState] = useState("idle");
  const [user, setUser] = useState({});

  const localUser = useSelector((state) => selectUserData(state));
  const isLocalUserPage = localUser.id === user.id;
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
    <>
      {loadingState === "loading" && (
        <div className="d-flex justify-content-center">
          <Spinner color="info" />
        </div>
      )}

      {loadingState === "success" && (
        <div className="profileContainer">
          <img
            src={user.background || placeholderBg}
            alt="User background"
            className="backgroundImg"
          />

          <div className="avatarAndEditProfileContainer">
            <Avatar context="userProfile" avatar={user.avatar} />

            <div>
              {isLocalUserPage ? (
                <Button className="mt-2" color="primary" outline>
                  Edit Profile
                </Button>
              ) : (
                <Button
                  className="mt-2"
                  color="primary"
                  outline
                  onClick={() => handleFollow()}
                >
                  {user.isFollowed ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>
          </div>
          <div className="profileInfo">
            <div className="mb-3">
              <div className="cfw-bolder cfs-20">{user.username}</div>
              <div className="cfc-gray">{`@${user.username}`}</div>
            </div>
            <div className="mb-3">{user.description}</div>
            <div className="mb-3">
              <span>
                {user.webpage ? (
                  <a href="github.com">
                    <IoIosLink /> {user.webpage}
                  </a>
                ) : null}
              </span>{" "}
              <span className="cfc-gray">
                {" "}
                <IoCalendarOutline /> {`Joined ${user.createdAt}`}
              </span>
            </div>
            <div>
              {" "}
              <Link to={`/${user.username}/following`}>
                <span data-testid="followed-count" className="cfw-bolder">
                  {user.followedCount}
                </span>{" "}
                <span className="cfc-gray">following</span> -{" "}
              </Link>
              <Link to={`/${user.username}/followers`}>
                <span data-testid="followers-count" className="cfw-bolder">
                  {user.followersCount}
                </span>{" "}
                <span className="cfc-gray">followers</span>{" "}
              </Link>
            </div>
          </div>
        </div>
      )}

      {loadingState === "failed" && (
        <div className="d-flex justify-content-center cfs-30 cfw-bold">
          Something went wrong!
        </div>
      )}
    </>
  );
}

export default UserProfile;
