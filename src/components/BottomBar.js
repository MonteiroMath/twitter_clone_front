import React from "react";

import { Navbar, Nav, NavItem, NavLink } from "reactstrap";

import home from "../icons/home.svg";
import search from "../icons/search.svg";
import bell from "../icons/bell.svg";
import mail from "../icons/mail.svg";

function BottomBar(props) {
  return (
    <Navbar className="d-md-none fixed-bottom bg-white">
      <Nav className="w-100 justify-content-between">
        <NavItem>
          <NavLink href="#">
            <img src={home} alt="home icon" width="25px" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <img src={search} alt="explore icon" width="25px" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <img src={bell} alt="notifications icon" width="25px" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <img src={mail} alt="messages icon" width="25px" />
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default BottomBar;
