import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Navbar, Nav, NavItem, NavLink } from "reactstrap";

import { LeftArrow } from "./svg/Svg";

export default function TopBar({ header }) {
  let history = useHistory();

  return (
    <Row className="sticky-top border bg-white" noGutters>
      <Row className="w-100 px-2" noGutters>
        <Col xs={2} className="pl-3">
          <Navbar>
            <Nav navbar>
              <NavItem>
                <NavLink
                  className="text-dark"
                  href="#"
                  onClick={(ev) => {
                    ev.preventDefault();
                    history.push("/");
                  }}
                >
                  <LeftArrow />
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </Col>
        <Col className="d-flex align-items-center cfw-bolder" xs="1">
          {header}
        </Col>
      </Row>
    </Row>
  );
}
