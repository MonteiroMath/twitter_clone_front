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

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "../../../store/UserSlice";

import tweet from "../../../assets/icons/tweet.svg";

const initialState = { email: "", password: "" };

function LoginModal({ isOpen, toggle }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formState, setFormState] = useState({
    ...initialState,
  });

  function clearForm() {
    setFormState({ ...initialState });
  }

  function handleFormChange(evt) {
    const { name, value } = evt.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const userData = { ...formState };
    dispatch(login(userData)).then((result) => {
      clearForm();
      toggle();

      if (result.payload.success) {
        history.push("/home");
      }
    });
  }

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
        <h1>Sign In</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleFormChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleFormChange}
              minLength={6}
              required
            />
          </FormGroup>
          <div className="d-flex mt-4">
            <Button className="ml-auto" color="primary">
              Login
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default LoginModal;
