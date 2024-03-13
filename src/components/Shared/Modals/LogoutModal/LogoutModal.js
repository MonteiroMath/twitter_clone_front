import React from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../../../../store/UserSlice";
import { clearUserState } from "../../../../store/utils/localStorageController";

import tweet from "../../../../assets/icons/tweet.svg";

function LogoutModal({ isOpen, toggle }) {
  const dispatch = useDispatch();

  const history = useHistory();

  function handleLogout() {
    dispatch(logout());
    clearUserState();
    history.push("/");
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>
        <img src={tweet} alt="tweet icon" width="30px" />
      </ModalHeader>
      <ModalBody>
        <h4 className="mb-5">Logout of NotTwitter?</h4>

        <Button className="mr-3" color="primary" onClick={handleLogout}>
          Logout
        </Button>
        <Button color="primary" outline onClick={toggle}>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  );
}

export default LogoutModal;
