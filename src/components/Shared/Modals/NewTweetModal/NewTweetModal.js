import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CommentTweetForm from "../../Forms/CommentTweetForm/CommentTweetForm";

export default function NewTweetModal({ modal, toggleQuote, quote }) {
  //todo verify if modal is only used for commenting
  return (
    <Modal isOpen={modal} toggle={toggleQuote}>
      <ModalHeader toggle={toggleQuote} />
      <ModalBody>
        <CommentTweetForm toggle={toggleQuote} quote={quote} />
      </ModalBody>
    </Modal>
  );
}
