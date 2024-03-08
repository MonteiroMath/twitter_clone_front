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

function LoginModal({ isOpen, toggle }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>
        <img src={tweet} alt="tweet icon" width="30px" />
      </ModalHeader>
      <ModalBody>
        <h1>Sign In</h1>
        <Form>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email"></Input>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password"></Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button> Login</Button>
      </ModalFooter>
    </Modal>
  );
}

export default LoginModal;
