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

  function handleFormChange(evt) {
    const { name, value } = evt.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    const userData = { ...formState };
    dispatch(login(userData)).then((result) => {
      console.log(result);
      setFormState({ ...initialState });
      toggle();

      if (result.payload.success) {
        history.push("/home");
      }
    });
  }

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
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit}> Login</Button>
      </ModalFooter>
    </Modal>
  );
}

export default LoginModal;
