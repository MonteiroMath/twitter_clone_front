import { render } from "@testing-library/react";
import { createStore } from "@reduxjs/toolkit";
import { Switch, Route } from "react-router-dom";
import Providers from "./components/Providers.js";
import reducer from "./store/reducer.js";

export const renderWithRedux = (
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
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
  { initialState, store = createStore(reducer, initialState) } = {}
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
