import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import { client } from "../../../../api/client";
import { selectUserData, selectJwtToken } from "../../../../store/UserSlice";

import FollowingList from "./FollowingList/FollowingList";
import { Spinner } from "reactstrap";
import styles from "./NewMessageModal.module.css";

function NewMessageModal({ isOpen, toggle }) {
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

  function handleUserSelection(userID) {
    setSelected(userID);
  }

  function handleNext() {
    if (selected) {
      client
        .postConversation({ from: selected, to: user.id })
        .then((result) => {
          if (result.success) {
            history.push(`/messages/${selected}`);
            toggle();
          }
        });
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader className="d-flex" toggle={toggle}>
        <div className="modal-title">New Message</div>
      </ModalHeader>
      <ModalBody>
        <div>
          {loadingState === "idle" && <Spinner color="info" />}
          {loadingState === "success" && (
            <div className={`overflow-auto ${styles.followingListContainer}`}>
              <FollowingList
                userList={followingList}
                handleUserSelection={handleUserSelection}
                selectedUser={selected}
              />
            </div>
          )}
          {loadingState === "failed" && (
            <div className="d-flex justify-content-center cfs-30 cfw-bold">
              Something went wrong!
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={handleNext}
          disabled={selected ? false : true}
        >
          Next
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default NewMessageModal;
