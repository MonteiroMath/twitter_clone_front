import React, { useEffect, useState } from "react";

import { Button } from "reactstrap";
import RegisterModal from "./RegisterModal/RegisterModal";
import LoginModal from "./LoginModal/LoginModal";

import tweet from "../../assets/icons/tweet.svg";

function LoginPage() {
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  function toggleRegister() {
    setIsOpenRegister((isOpen) => !isOpen);
  }

  function toggleLogin() {
    setIsOpenLogin((isOpen) => !isOpen);
  }

  return (
    <>
      <div className="c-vp-height loginPage pt-4 px-5">
        <div className="mb-5">
          <img className="loginLogo" src={tweet} alt="tweet icon" />
        </div>

        <div className="loginMainContainer">
          <h1 class="cfs-gigantic font-weight-bold">Happening Now</h1>
          <h3 class="font-weight-bold">Join today.</h3>

          <Button
            className="loginPageButton"
            color="primary"
            onClick={toggleRegister}
          >
            Create account
          </Button>

          <div>
            <div class="font-weight-bold mb-3">Already have an account?</div>
            <Button
              className="loginPageButton"
              color="primary"
              outline
              onClick={toggleLogin}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
      <RegisterModal isOpen={isOpenRegister} toggle={toggleRegister} />
      <LoginModal isOpen={isOpenLogin} toggle={toggleRegister} />
    </>
  );
}

export default LoginPage;
