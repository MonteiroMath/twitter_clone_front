import React, { useState } from "react";
import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import NewTweet from "../newTweet/NewTweet";

import { PenIcon } from "../svg/Svg";

function SideBarTweetButton(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button className="csidebarTweet" color="info" onClick={toggle}>
        <div className="d-inline-block d-lg-none">
          <PenIcon />
        </div>
        <span className="d-none d-lg-inline font-weight-bold">Tweet</span>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} />
        <ModalBody>
          <NewTweet toggle={toggle} />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default SideBarTweetButton;
