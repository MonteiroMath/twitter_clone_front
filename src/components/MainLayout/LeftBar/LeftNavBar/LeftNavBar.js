import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../store/UserSlice";
import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";

import tweet from "../../../../assets/icons/tweet.svg";
import home from "../../../../assets/icons/home.svg";
import search from "../../../../assets/icons/search.svg";
import bell from "../../../../assets/icons/bell.svg";
import mail from "../../../../assets/icons/mail.svg";
import bookmark from "../../../../assets/icons/bookmark.svg";
import list from "../../../../assets/icons/list.svg";
import profile from "../../../../assets/icons/profile.svg";
import dots from "../../../../assets/icons/three-dots.svg";

function LeftNavBar(props) {
  const userData = useSelector(selectUserData);

  return (
    <Navbar>
      <Nav className="justify-content-center font-weight-bold" navbar>
        <NavbarBrand className="mr-0">
          <img src={tweet} alt="tweet icon" width="35px" />
        </NavbarBrand>
        <NavItem>
          <NavLink href="/home">
            <img src={home} alt="home icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline text-dark">Home</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <img src={search} alt="explore icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline text-dark">Explore</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <img src={bell} alt="notifications icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline text-dark">
              Notifications
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/messages">
            <img src={mail} alt="messages icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline text-dark">Messages</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <img src={bookmark} alt="bookmarks icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline text-dark">Bookmarks</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <img src={list} alt="lists icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline text-dark">List</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href={`/${userData.username}`}>
            <img src={profile} alt="profile icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline text-dark">Profile</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="#">
            <img src={dots} alt="more icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline text-dark">More</span>
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default LeftNavBar;
