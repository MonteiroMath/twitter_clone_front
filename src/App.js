import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectJwtToken } from "./store/UserSlice";

import "./App.css";
import PrivateRoute from "./components/Shared/PrivateRoute/PrivateRoute";
import LoginPage from "./components/LoginPage/LoginPage";
import UserPage from "./components/UserPage/UserPage";
import FeedPage from "./components/FeedPage/FeedPage";
import TweetPage from "./components/TweetPage/TweetPage";
import NewTweetPage from "./components/NewTweetPage/NewTweetPage";
import FollowsPage from "./components/FollowersPage/FollowsPage";
import MessagesPage from "./components/MessagesPage/MessagesPage";

function App() {
  const jwtToken = useSelector((state) => selectJwtToken(state));

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/newTweet">
          <NewTweetPage />
        </PrivateRoute>
        <PrivateRoute path="/tweet/:id">
          <TweetPage />
        </PrivateRoute>
        <PrivateRoute path="/home">
          <FeedPage />
        </PrivateRoute>
        <PrivateRoute path="/messages/:userId?">
          <MessagesPage />
        </PrivateRoute>
        <PrivateRoute path="/:username/followers">
          <FollowsPage shouldFetchFollowers={true} />
        </PrivateRoute>
        <PrivateRoute path="/:username/following">
          <FollowsPage shouldFetchFollowers={false} />
        </PrivateRoute>
        <PrivateRoute path="/:username">
          <UserPage />
        </PrivateRoute>

        <Route path="/">
          {jwtToken ? <Redirect to="/home" /> : <LoginPage />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
