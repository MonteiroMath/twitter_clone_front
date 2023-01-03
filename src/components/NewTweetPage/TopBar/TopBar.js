import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { LeftArrow } from "../../Svg/Svg";

function TopBar(props) {
  let history = useHistory();

  return (
    <Row className="sticky-top border bg-white px-2 w-100" noGutters>
      <Col className="pl-3">
        <Navbar>
          <Nav navbar>
            <NavItem>
              <NavLink
                className="text-dark"
                href="#"
                onClick={history.goBack}
              >
                <LeftArrow/>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </Col>
    </Row>
  );
}

export default TopBar;
