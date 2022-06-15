import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CommentTweet from "./CommentTweet";
import RetweetBox from "./feed/RetweetBox";
import user from "../placeholders/user";

export default function AnswerModal({ modal, toggle, parent, parentContent }) {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} />
      <ModalBody>
        <RetweetBox user={user} retweet={parentContent} />

        <div className="pt-3">
          <CommentTweet toggle={toggle} parent_id={parseInt(parent.id)} />
        </div>
      </ModalBody>
    </Modal>
  );
}
