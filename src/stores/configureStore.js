import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import persistState from "redux-localstorage";
import createLogger from "redux-logger";
import { routerMiddleware as createRouterMiddleware } from "react-router-redux";
import { browserHistory } from "react-router";
import { createCycleMiddleware } from "redux-cycle-middleware";
import { makeHTTPDriver } from "@cycle/http";
import mainCycle from "./cycles";

const routerMiddleware = createRouterMiddleware(browserHistory);
const logger = createLogger();
const cycleMiddleware = createCycleMiddleware(mainCycle, {
  HTTP: makeHTTPDriver()
});

const enhancer = compose(
  applyMiddleware(cycleMiddleware, routerMiddleware, logger),
  persistState(["auth", "apps"])
);

export default function configureStore(preloadedState) {
  return createStore(rootReducer, preloadedState, enhancer);
}
