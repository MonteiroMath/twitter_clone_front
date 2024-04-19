import placeholderBg from "../../../assets/images/bgplaceholder.gif";
import Avatar from "../../Shared/Avatar/Avatar";
import { Button } from "reactstrap";

import { IoIosLink } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../store/UserSlice";

function UserProfile({ user, handleFollow }) {
  const localUser = useSelector((state) => selectUserData(state));
  const isLocalUserPage = localUser.id === user.id;

  return (
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
          <span className="cfw-bolder">{user.followedCount}</span>{" "}
          <span className="cfc-gray">following</span> -{" "}
          <span className="cfw-bolder">{user.followersCount}</span>{" "}
          <span className="cfc-gray">followers</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
