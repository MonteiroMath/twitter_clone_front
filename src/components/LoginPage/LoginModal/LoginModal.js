import React, { useState, useEffect, useCallback } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  login,
  selectLoginStatus,
  clearRequest,
} from "../../../store/UserSlice";

import tweet from "../../../assets/icons/tweet.svg";

const initialState = { email: "", password: "" };

function LoginModal({ isOpen, toggle }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginStatus = useSelector((state) => selectLoginStatus(state));

  const [formState, setFormState] = useState({
    ...initialState,
  });

  const clearForm = useCallback(() => {
    setFormState({ ...initialState });
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
    const userData = { ...formState };
    dispatch(login(userData));
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
            <Label for="email">Email</Label>
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
            <Label for="password">Password</Label>
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
          <div className="d-flex mt-4">
            <Button className="ml-auto" color="primary">
              Login
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

export default LoginModal;
