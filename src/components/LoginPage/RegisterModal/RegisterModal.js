import React, { useState } from "react";
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

import { client } from "../../../api/client";
import tweet from "../../../assets/icons/tweet.svg";

const initialFormState = {
  email: "",
  username: "",
  password: "",
  birthDate: "",
};

function RegisterModal({ isOpen, toggle }) {
  const [formState, setFormState] = useState({ ...initialFormState });

  function handleFormChange(evt) {
    const { name, value } = evt.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    const newUser = { ...formState };

    client
      .registerUser(newUser)
      .then((result) => {
        console.log(result);
        setFormState({ ...initialFormState });
        toggle();
      })
      .catch((err) => console.log(err));
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>
        <img src={tweet} alt="tweet icon" width="30px" />
      </ModalHeader>
      <ModalBody>
        <h1>Create your Account</h1>
        <Form>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleFormChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleFormChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleFormChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              name="birthDate"
              value={formState.birthDate}
              onChange={handleFormChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit}> Create Account </Button>
      </ModalFooter>
    </Modal>
  );
}

export default RegisterModal;
