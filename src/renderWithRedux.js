import { render } from "@testing-library/react";
import { createStore } from "@reduxjs/toolkit";
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
