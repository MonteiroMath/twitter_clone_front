import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Label,
  Input,
} from "reactstrap";

import tweet from "../../../assets/icons/tweet.svg";

function RegisterModal({ isOpen, toggle }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>
        <img src={tweet} alt="tweet icon" width="30px" />
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Name</Label>
            <Input type="text"></Input>
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email"></Input>
          </FormGroup>
          <FormGroup>
            <Label>Date of Birth</Label>
            <Input type="date"></Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button> Create Account </Button>
      </ModalFooter>
    </Modal>
  );
}

export default RegisterModal;
