import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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

import {
  selectLoginStatus,
  clearRequest,
  registerUser,
} from "../../../store/UserSlice";

import tweet from "../../../assets/icons/tweet.svg";

const initialFormState = {
  email: "",
  username: "",
  password: "",
  birthDate: "",
};

function RegisterModal({ isOpen, toggle }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formState, setFormState] = useState({ ...initialFormState });
  const loginStatus = useSelector((state) => selectLoginStatus(state));

  const clearForm = useCallback(() => {
    setFormState({ ...initialFormState });
    dispatch(clearRequest());
  }, [dispatch]);

  useEffect(() => {
    if (loginStatus.status === "fulfilled") {
      history.push("/home");
      clearForm();
      toggle();
    }
  }, [loginStatus, history, toggle, clearForm]);

  function handleFormChange(evt) {
    const { name, value } = evt.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      const newUser = { ...formState };

      dispatch(registerUser(newUser));
    }
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
        {loginStatus.error ? (
          <div className="errorBox">{loginStatus.error}</div>
        ) : null}
      </ModalBody>
    </Modal>
  );
}

export default RegisterModal;
