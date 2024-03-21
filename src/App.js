import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import LoginPage from "./components/LoginPage/LoginPage";
import UserPage from "./components/UserPage/UserPage";
import FeedPage from "./components/FeedPage/FeedPage";
import TweetPage from "./components/TweetPage/TweetPage";
import NewTweetPage from "./components/NewTweetPage/NewTweetPage";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/newTweet">
          <NewTweetPage />
        </Route>
        <Route path="/tweet/:id">
          <TweetPage />
        </Route>
        <Route path="/home">
          <FeedPage />
        </Route>
        <Route path="/:username">
          <UserPage />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
