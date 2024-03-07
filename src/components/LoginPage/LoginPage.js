import React, { useEffect, useState } from "react";

import { Row, Col, Button } from "reactstrap";

import tweet from "../../assets/icons/tweet.svg";

/*
    <Row className="c-vp-height flex-column pt-4 pl-5 bg-danger " noGutters>
      <Col className="mb-5 bg-secondary">
        <img src={tweet} alt="tweet icon" width="55px" />
      </Col>
      <Col
        className="d-flex flex-column justify-content-center bg-primary"
        
      >
        <h2 class="font-weight-bold">Happening Now</h2>
        <h4 class="font-weight-bold">Join today.</h4>

        <Button color="primary">Create account</Button>

        <div>
          <div class="font-weight-bold">Already have an account?</div>
          <Button color="primary" outline>
            Sign In
          </Button>
        </div>
      </Col>
    </Row>
    */

function LoginPage() {
  return (
    <div className="c-vp-height loginPage pt-4 px-5">
      <div className="mb-5">
        <img className="loginLogo" src={tweet} alt="tweet icon" />
      </div>

      <div className="loginMainContainer">
        <h1 class="cfs-gigantic font-weight-bold">Happening Now</h1>
        <h3 class="font-weight-bold">Join today.</h3>

        <Button className="loginPageButton" color="primary">
          Create account
        </Button>

        <div>
          <div class="font-weight-bold mb-3">Already have an account?</div>
          <Button className="loginPageButton" color="primary" outline>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
