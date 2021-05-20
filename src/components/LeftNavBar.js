import React from "react";

import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";

import tweet from "../icons/tweet.svg";
import home from "../icons/home.svg";
import search from "../icons/search.svg";
import bell from "../icons/bell.svg";
import mail from "../icons/mail.svg";

import bookmark from "../icons/bookmark.svg";
import list from "../icons/list.svg";
import profile from "../icons/profile.svg";
import dots from "../icons/three-dots.svg";

function LeftNavBar(props) {
  return (
    <Navbar>
      <Nav className="justify-content-center font-weight-bold" navbar>
        <NavbarBrand className="mr-0">
          <img src={tweet} alt="tweet icon" width="35px" />
        </NavbarBrand>
        <NavItem>
          <NavLink href="#">
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
          <NavLink href="#">
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
          <NavLink href="#">
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
