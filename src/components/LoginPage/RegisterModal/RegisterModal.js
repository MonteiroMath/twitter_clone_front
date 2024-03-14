import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
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
  const [error, setError] = useState(null);

  function clearForm() {
    setFormState({ ...initialFormState });
    setError(null);
  }

  function handleFormChange(evt) {
    const { name, value } = evt.target;

    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const newUser = { ...formState };

    client
      .registerUser(newUser)
      .then((result) => {
        setFormState({ ...initialFormState });
        toggle();
      })
      .catch((err) => {
        setError(
          "Ocorreu um erro. Tente novamente mais tarde ou contacte o administrador."
        );
        console.log(err);
      });
  }

  const maxDate = new Date().toISOString().substring(0, 10);

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        clearForm();
        toggle();
      }}
      centered
    >
      <ModalHeader
        toggle={() => {
          clearForm();
          toggle();
        }}
      >
        <img src={tweet} alt="tweet icon" width="30px" />
      </ModalHeader>
      <ModalBody>
        <h1>Create your Account</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Name*</Label>
            <Input
              id="username"
              type="text"
              name="username"
              value={formState.username}
              onChange={handleFormChange}
              minLength={6}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email*</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleFormChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password*</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleFormChange}
              minLength={6}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="date">Date of Birth*</Label>
            <Input
              id="date"
              type="date"
              name="birthDate"
              value={formState.birthDate}
              onChange={handleFormChange}
              max={maxDate}
              required
            />
          </FormGroup>
          <div className="d-flex mt-4">
            <Button className="ml-auto" color="primary">
              Create Account{" "}
            </Button>
          </div>
        </Form>
        {error ? <div className="errorBox">{error}</div> : null}
      </ModalBody>
    </Modal>
  );
}

export default RegisterModal;
