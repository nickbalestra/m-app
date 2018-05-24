import xs from "xstream";
import { combineCycles } from "redux-cycle-middleware";
import { push } from "react-router-redux";
import { API_URL } from "../constants/api";

// ACTION TYPES (Format: app-name/reducer/ACTION_TYPE)
// =======================================================
const LOGIN = "m-app/auth/LOGIN";
const LOGIN_SUCCESS = "m-app/auth/LOGIN_SUCCESS";
const LOGIN_FAIL = "m-app/auth/LOGIN_FAIL";
export const LOGOUT = "m-app/auth/LOGOUT";
// const LOGOUT_SUCCESS = 'm-app/auth/LOGOUT_SUCCESS'
// const LOGOUT_FAIL = 'm-app/auth/LOGOUT_FAIL'

// ACTION CREATORS
// =======================================================
export function doLogin(email, password) {
  return {
    type: LOGIN,
    payload: {
      email,
      password
    }
  };
}

export function doLogout(msg) {
  return {
    type: LOGOUT,
    payload: msg
  };
}

function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    payload: token
  };
}

// REDUCER
// =======================================================
const initialState = {
  inProgress: false,
  token: null,
  error: null
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN:
      return { ...state, inProgress: true };
    case LOGIN_SUCCESS:
      return { ...state, inProgress: false, token: payload };
    case LOGIN_FAIL:
      return { ...state, inProgress: false, error: payload };
    case LOGOUT:
      return { ...state, token: null, inProgress: false, error: payload };
    default:
      return state;
  }
}

// CYCLE
// =======================================================
const cycleLogin = sources => {
  function networking(sources) {
    const loginAction$ = sources.ACTION.filter(({ type }) => type === LOGIN);

    const request$ = loginAction$.map(({ payload }) => ({
      url: `${API_URL}/login`,
      method: "POST",
      category: LOGIN,
      headers: {
        "Content-Type": "application/json"
      },
      send: {
        email: payload.email,
        password: payload.password
      }
    }));

    return request$;
  }

  function intent(sources) {
    const action$ = sources.HTTP.select(LOGIN)
      .map(response$ => response$.replaceError(error => xs.of(error.response)))
      .flatten()
      .map(
        res =>
          res.error
            ? {
                type: LOGIN_FAIL,
                payload: res.error,
                error: true
              }
            : loginSuccess(res.body.accessToken)
      );

    return action$;
  }

  return {
    ACTION: intent(sources),
    HTTP: networking(sources)
  };
};

const cycleLoginSuccess = sources => {
  function intent(sources) {
    return sources.ACTION.filter(({ type }) => type === LOGIN_SUCCESS).mapTo(
      push("/")
    );
  }
  return {
    ACTION: intent(sources)
  };
};

const cycleLogout = sources => {
  function intent(sources) {
    return sources.ACTION.filter(({ type }) => type === LOGOUT).mapTo(
      push("/login")
    );
  }
  return {
    ACTION: intent(sources)
  };
};

const cycleLoginFail = sources => {
  function intent(sources) {
    return sources.ACTION.filter(({ type }) => type === LOGIN_FAIL).mapTo(
      doLogout()
    );
  }
  return {
    ACTION: intent(sources)
  };
};

export const cycle = combineCycles(
  cycleLogin,
  cycleLoginSuccess,
  cycleLogout,
  cycleLoginFail
);
