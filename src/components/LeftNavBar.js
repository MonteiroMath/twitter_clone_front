import React from "react";

import { Navbar, Nav, NavItem, NavLink, NavbarBrand, Button } from "reactstrap";

import tweet from "../icons/tweet.svg";
import home from "../icons/home.svg";
import search from "../icons/search.svg";
import bell from "../icons/bell.svg";
import mail from "../icons/mail.svg";
import feather from "../icons/feather.svg";
import bookmark from "../icons/bookmark.svg";
import list from "../icons/list.svg";
import profile from "../icons/profile.svg";
import dots from "../icons/three-dots.svg";

function LeftNavBar(props) {
  return (
    <Navbar className="mr-3">
      <Nav className="align-items-center align-items-lg-start" navbar>
        <NavbarBrand className="mr-0">
          <img src={tweet} alt="tweet icon" width="35px" />
        </NavbarBrand>
        <NavItem>
          <NavLink href="#">
            <img src={home} alt="home icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline">Home</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <img src={search} alt="explore icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline">Explore</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <img src={bell} alt="notifications icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline">Notifications</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <img src={mail} alt="messages icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline">Messages</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <img src={bookmark} alt="bookmarks icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline">Bookmarks</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <img src={list} alt="lists icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline">List</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <img src={profile} alt="profile icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline">Profile</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="#">
            <img src={dots} alt="more icon" width="25px" />
            <span className="ml-3 d-none d-lg-inline">More</span>
          </NavLink>
        </NavItem>

        <Button color="info" className="mt-4">
          <div>
            <img
              className="d-lg-none"
              src={feather}
              alt="new tweet icon"
              width="20px"
            />
            <span className="d-none d-lg-inline">Tweet</span>
          </div>
        </Button>
      </Nav>
    </Navbar>
  );
}

export default LeftNavBar;
