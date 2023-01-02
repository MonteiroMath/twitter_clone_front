import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Row, Col } from "reactstrap";

import "./App.css";

import Feed from "./components/Feed/Feed";
import RightBar from "./components/RightBar/RightBar";
import LeftBar from "./components/LeftBar/LeftBar";
import Compose from "./components/Compose/Compose";

import TweetPage from "./components/TweetPage/TweetPage";

function App() {
  return (
    <Router>
      <div color="white">
        <Row noGutters>
          <Col className="d-none d-md-block pt-1 fixed-top" md="2" lg="3">
            <LeftBar />
          </Col>
          <Col className="ml-auto p-0" xs="12" md="10" lg="6">
            <Switch>
              <Route path="/compose">
                <Compose />
              </Route>
              <Route path="/tweet/:id">
                <TweetPage />
              </Route>

              <Route path="/">
                <Feed />
              </Route>
            </Switch>
          </Col>
          <Col className="d-none d-lg-block px-2 pt-0" lg="3">
            <RightBar />
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default App;
