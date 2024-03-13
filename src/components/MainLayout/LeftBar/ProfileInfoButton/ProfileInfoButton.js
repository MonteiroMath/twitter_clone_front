import React, { useState } from "react";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useSelector } from "react-redux";
import { selectUserData } from "../../../../store/UserSlice";

import Avatar from "../../../Shared/Avatar/Avatar";
import { ShowMoreIcon } from "../../../Shared/Svg/Svg";
import LogoutModal from "../../../Shared/Modals/LogoutModal/LogoutModal";

function ProfileInfoButton(props) {
  const user = useSelector((state) => selectUserData(state));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const toggleModal = () => setModalOpen((prevState) => !prevState);

  return (
    <>
      <Dropdown
        className="d-flex justify-content-center"
        isOpen={dropdownOpen}
        toggle={toggleDropdown}
        direction="up"
      >
        <DropdownToggle color="none">
          <Row>
            <Col>
              <Avatar size="45px" />
            </Col>
            <Col className="d-none d-lg-block">
              <div className=" text-left">
                <div className="cfw-bolder">{user.username}</div>
                <div className="text-secondary">{`@${user.username}`}</div>
              </div>
            </Col>
            <Col className="d-none d-lg-block">
              <ShowMoreIcon />
            </Col>
          </Row>
        </DropdownToggle>
        <DropdownMenu className="pt-2 pr-5 mb-2">
          <DropdownItem onClick={toggleModal}>
            <span className="cfw-bolder">Logout {`@${user.username}`}</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <LogoutModal isOpen={modalOpen} toggle={toggleModal} />
    </>
  );
}

export default ProfileInfoButton;
