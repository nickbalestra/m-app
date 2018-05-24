import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";

import auth from "../ducks/auth";
import user from "../ducks/user";
import apps from "../ducks/apps";
import users from "../ducks/users";

export default combineReducers({
  auth,
  user,
  apps,
  users,
  routing
});
