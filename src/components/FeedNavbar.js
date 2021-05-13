import React from "react";
import stars from "../icons/star.svg";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";

function FeedNavbar(props) {
  return (
    <Navbar className="sticky-top border p-2" expand="xs" color="white">
      <Nav navbar>
        <NavItem>
          <NavLink href="#">
            <b>Home</b>
          </NavLink>
        </NavItem>
      </Nav>
      <div className="ml-auto mr-3">
        <img src={stars} alt="starts icon" width="15px" />
      </div>
    </Navbar>
  );
}

export default FeedNavbar;
