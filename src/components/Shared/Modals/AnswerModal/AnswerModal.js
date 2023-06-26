import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import AnswerTweetForm from "../../../Shared/Forms/AnswerTweetForm/AnswerTweetForm";
import RetweetBox from "../../TweetCard/RetweetBox/RetweetBox";

import user from "../../../../assets/placeholders/user";

export default function AnswerModal({
  modal,
  toggle,
  parentId,
  parentContent,
}) {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} />
      <ModalBody>
        <RetweetBox user={user} retweet={parentContent} />

        <div className="pt-3">
          <AnswerTweetForm toggle={toggle} parent_id={parseInt(parentId)} />
        </div>
      </ModalBody>
    </Modal>
  );
}
