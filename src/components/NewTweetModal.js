import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import NewTweet from "./NewTweet/NewTweet";

export default function NewTweetModal({ modal, toggleQuote, quote }) {
  return (
    <Modal isOpen={modal} toggle={toggleQuote}>
      <ModalHeader toggle={toggleQuote} />
      <ModalBody>
        <NewTweet
          toggle={toggleQuote}
          quote={quote}
          placeholder="Add Comment"
        />
      </ModalBody>
    </Modal>
  );
}
