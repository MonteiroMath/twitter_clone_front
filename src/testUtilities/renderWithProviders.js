import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Switch, Route } from "react-router-dom";

import Providers from "../components/Shared/Providers/Providers.js";

import tweetsSlice from "../store/tweetsSlice.js";

import PageSlice from "../store/PageSlice.js";

export const renderWithRedux = (
  component,
  {
    initialState,
    store = configureStore({
      reducer: {
        tweets: tweetsSlice,
        page: PageSlice,
      },
      preloadedState: initialState,
    }),
  } = {}
) => {
  return {
    ...render(<Providers store={store}>{component}</Providers>),
    store,
  };
};

export const renderWithHistory = (
  component,
  history,
  path,
  {
    initialState,
    store = configureStore({
      reducer: {
        tweets: tweetsSlice,
        page: PageSlice,
      },
      preloadedState: initialState,
    }),
  } = {}
) => {
  return {
    ...render(
      <Providers store={store} history={history}>
        <Switch>
          <Route path={path}>{component}</Route>
        </Switch>
      </Providers>
    ),
    store,
  };
};
