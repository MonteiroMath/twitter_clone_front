import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Row, Col } from "reactstrap";

import "./App.css";

import RightBar from "./components/HomePage/RightBar/RightBar";
import LeftBar from "./components/HomePage/LeftBar/LeftBar";

import FeedPage from "./components/FeedPage/FeedPage";
import TweetPage from "./components/TweetPage/TweetPage";
import NewTweetPage from "./components/NewTweetPage/NewTweetPage";

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
              <Route path="/newTweet">
                <NewTweetPage />
              </Route>
              <Route path="/tweet/:id">
                <TweetPage />
              </Route>
              <Route path="/">
                <FeedPage />
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
