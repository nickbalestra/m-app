import React from "react";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { Provider } from "react-redux";
import store from "./stores";
const history = syncHistoryWithStore(browserHistory, store);
import routes from "./routes";

export default () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);
