import Rx from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import { push } from 'react-router-redux'
import { API_URL } from '../constants/api'

// ACTION TYPES (Format: app-name/reducer/ACTION_TYPE)
// =======================================================
const LOGIN = 'm-app/auth/LOGIN'
const LOGIN_SUCCESS = 'm-app/auth/LOGIN_SUCCESS'
const LOGIN_FAIL = 'm-app/auth/LOGIN_FAIL'
const LOGOUT = 'm-app/auth/LOGOUT'
const LOGOUT_SUCCESS = 'm-app/auth/LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'm-app/auth/LOGOUT_FAIL'


// ACTION CREATORS
// =======================================================
export function doLogin(email, password) {
  return {
    type: LOGIN,
    payload: {
      email,
      password
    }
  }
}

function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    payload: token
  }
}


// REDUCER
// =======================================================
const initialState = {
  inProgress: false,
  token: null,
  error: null,
}

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case LOGIN:
      return {...state, inProgress: true}
    case LOGIN_SUCCESS:
      return {...state, inProgress: false, token: payload}
    case LOGIN_FAIL:
      return {...state, inProgress: false, error: payload}
    default:
      return state
  }
}


// EPIC
// =======================================================
const epicLogin = action$ =>
  action$
    .ofType(LOGIN)
    .mergeMap(({ payload }) =>
      Rx.Observable.ajax({
        url: `${API_URL}/login`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          'email': payload.email,
          'password': payload.password
        }
      })
      .map(({ response }) => loginSuccess(response.accessToken))
    )

const epicLoginSuccess = action$ =>
  action$
    .ofType(LOGIN_SUCCESS)
    .mapTo(push('/'))

export const epic = combineEpics(
    epicLogin,
    epicLoginSuccess
  )


// UTILS
// =======================================================
const mustBeLoggedIn = store => (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }

const mustBeLoggedOut = store => (nextState, replace) => {
    if (store.getState().auth.token) {
      replace({
        pathname: '/'
      })
    }
  }

export const utils = {
  mustBeLoggedIn,
  mustBeLoggedOut
}
