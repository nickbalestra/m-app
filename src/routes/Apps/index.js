import Apps from "./components/Apps";
import App from "./routes/App";
import store from "../../stores";

const route = {
  path: "apps",
  name: "apps",
  onEnter(nextState, replace, cb) {
    if (!store.getState().auth.token) {
      replace({
        pathname: "/login",
        state: { nextPathname: nextState.location.pathname }
      });
    }
    cb();
  },

  getChildRoutes(partialNextState, cb) {
    cb(null, [App]);
  },

  getComponent(nextState, cb) {
    cb(null, Apps);
  }
};

export default route;
