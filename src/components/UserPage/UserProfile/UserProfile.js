import placeholderBg from "../../../assets/images/phbackground.jpg";
import Avatar from "../../Shared/Avatar/Avatar";
import { Button } from "reactstrap";

import { CiLocationOn } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";

function UserProfile({ username }) {
  //Placer for user info display
  return (
    <div className="profileContainer">
      <img
        src={placeholderBg}
        alt="User background"
        className="backgroundImg"
      />

      <div className="avatarAndEditProfileContainer">
        <Avatar context="userProfile" />

        <div>
          <Button className="mt-2" color="primary" outline>
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="profileInfo">
        <div className="mb-3">
          <div className="cfw-bolder cfs-20">matham</div>
          <div className="cfc-gray">@matham</div>
        </div>
        <div className="mb-3">This is a very interesting description</div>
        <div className="mb-3">
          <span className="cfc-gray">
            {" "}
            <CiLocationOn /> Loch Modan
          </span>{" "}
          <span>
            {" "}
            <a href="github.com">
              <IoIosLink /> github.com{" "}
            </a>
          </span>{" "}
          <span className="cfc-gray">
            {" "}
            <IoCalendarOutline /> Joined April 2021{" "}
          </span>
        </div>
        <div>
          {" "}
          <span className="cfw-bolder">32</span>{" "}
          <span className="cfc-gray">following</span> -{" "}
          <span className="cfw-bolder">31</span>{" "}
          <span className="cfc-gray">followers</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
