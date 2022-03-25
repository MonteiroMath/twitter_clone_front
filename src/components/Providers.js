import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";

function Providers({ store, children }) {
  return (
    <Router>
      <Provider store={store}>{children}</Provider>
    </Router>
  );
}

export default Providers;
