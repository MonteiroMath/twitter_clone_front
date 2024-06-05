import React from "react";
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

import Avatar from "../../Avatar/Avatar";

function NewMessageModal({ isOpen, toggle }) {
  //todo search will filter list of contacts
  //todo clicking on an user should make it selected
  //todo next button should be disabled until an user is selected
  //todo clicking on next redirect to messages/recipientID with the id of the user that was selected

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
          <Row className="mt-4">
            <Col xs="2">
              <Avatar />
            </Col>
            <Col>
              <div className="cfw-bolder">Contact name </div>
              <div className="text-muted">@Contact name </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs="2">
              <Avatar />
            </Col>
            <Col>
              <div className="cfw-bolder">Contact name </div>
              <div className="text-muted">@Contact name </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs="2">
              <Avatar />
            </Col>
            <Col>
              <div className="cfw-bolder">Contact name </div>
              <div className="text-muted">@Contact name </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs="2">
              <Avatar />
            </Col>
            <Col>
              <div className="cfw-bolder">Contact name </div>
              <div className="text-muted">@Contact name </div>
            </Col>
          </Row>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary">Next</Button>
      </ModalFooter>
    </Modal>
  );
}

export default NewMessageModal;
