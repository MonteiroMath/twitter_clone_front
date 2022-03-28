import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";

function Providers({ store, history, children }) {
  return (
    <Router history={history ? history : createMemoryHistory()}>
      <Provider store={store}>{children}</Provider>
    </Router>
  );
}

export default Providers;
