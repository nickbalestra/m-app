import { LOGOUT } from "./auth";

// ACTION TYPES (Format: app-name/reducer/ACTION_TYPE)
// =======================================================
const SET_EMAIL = "m-app/user/SET_EMAIL";
const SET_PASSWORD = "m-app/user/SET_PASSWORD";

// ACTION CREATORS
// =======================================================
export function setEmail(email) {
  return {
    type: SET_EMAIL,
    payload: email
  };
}

export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    payload: password
  };
}

// REDUCER
// =======================================================
const initialState = {
  email: null,
  password: null
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_EMAIL:
      return { ...state, email: payload };
    case SET_PASSWORD:
      return { ...state, password: payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
