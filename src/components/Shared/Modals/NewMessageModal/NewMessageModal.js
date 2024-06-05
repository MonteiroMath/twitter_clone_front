import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";

import { client } from "../../../../api/client";
import { selectUserData, selectJwtToken } from "../../../../store/UserSlice";

import Avatar from "../../Avatar/Avatar";
import FollowingList from "./FollowingList/FollowingList";

function NewMessageModal({ isOpen, toggle }) {
  //todo search will filter list of contacts
  //todo clicking on an user should make it selected
  //todo next button should be disabled until an user is selected

  const history = useHistory();
  const user = useSelector((state) => selectUserData(state));
  const jwtToken = useSelector((state) => selectJwtToken(state));

  const [loadingState, setLoadingState] = useState("idle");
  const [followingList, setFollowingList] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoadingState("loading");

    client.getFollowing(user.username, jwtToken).then((result) => {
      if (result.success) {
        setFollowingList(result.followed);
        setLoadingState("success");
      } else {
        setLoadingState("failed");
      }
    });
  }, [user.username, jwtToken]);

  function handleUserSelection(userId) {
    setSelected(userId);
  }

  function handleNext() {
    if (selected) {
      history.push(`/messages/${selected}`);
      toggle();
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader className="d-flex" toggle={toggle}>
        <div className="modal-title">New Message</div>
      </ModalHeader>
      <ModalBody>
        <InputGroup>
          <InputGroupText>@</InputGroupText>
          <Input placeholder="Search people" />
        </InputGroup>
        <div>
          <FollowingList
            userList={followingList}
            handleUserSelection={handleUserSelection}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleNext}>
          Next
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default NewMessageModal;
