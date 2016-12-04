import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import Rx from 'rxjs/Rx'


// ====================================
// REDUCERS
// ====================================

// AUTH REDUCER
// ------------------------------------
const initialAuthState = {
  inProgress: false,
  token: null,
  error: null,
}

const authReducer = (state = initialAuthState, {type, payload}) => {
  switch (type) {
    case 'LOGIN':
      return {...state, inProgress: true}
    case 'LOGIN-SUCCESS':
      return {...state, inProgress: false, token: payload}
    case 'LOGIN-FAIL':
      return {...state, inProgress: false, error: payload}
    default:
      return state
  }
}

// USER REDUCER
// ------------------------------------
const initialUserInfoState = {
  email: null,
  password: null
}

const userInfoReducer = (state = initialUserInfoState, {type, payload}) => {
  switch (type) {
    case 'EMAIL':
      return {...state, email: payload}
    case 'PASSWORD' :
      return {...state, password: payload}
    default:
      return state
  }
}

// ROOT REDUCER
// ------------------------------------
const rootReducer = combineReducers({
  auth: authReducer,
  user: userInfoReducer,
})


// ====================================
// EPICS
// ====================================

// LOGIN EPIC
// ------------------------------------
const epicLogin = action$ =>
  action$
    .ofType('LOGIN')
    .mergeMap(({payload}) =>
      Rx.Observable.ajax({
        url: 'https://guarded-thicket-22918.herokuapp.com/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          'email': payload.email,
          'password': payload.password
        }
      })
      .map(({response}) => ({ type: 'LOGIN-SUCCESS', payload: response.accessToken }))
    )


// ====================================
// STORE CONFIG
// ====================================

const epicMiddleware = createEpicMiddleware(epicLogin);

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
)

export default store
