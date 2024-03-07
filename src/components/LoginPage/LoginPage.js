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
    <div className="pt-4 px-5">
      <div className="mb-5">
        <img src={tweet} alt="tweet icon" width="55px" />
      </div>

      <div className="loginMainContainer">
        <h1 class="font-weight-bold">Happening Now</h1>
        <h4 class="font-weight-bold">Join today.</h4>

        <Button color="primary">Create account</Button>

        <div class="font-weight-bold">Already have an account?</div>
        <Button color="primary" outline>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
