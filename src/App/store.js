import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import Rx from 'rxjs/Rx'
import persistState from 'redux-localstorage'
import { routerReducer, routerMiddleware, push } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'


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
  console.log('ACTION: ', {type, payload})
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
  routing: routerReducer
})


// ====================================
// EPICS
// ====================================

// LOGIN EPIC
// ------------------------------------
const epicLoginAttempt = action$ =>
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

  const epicLoginSuccess = action$ =>
  action$
    .ofType('LOGIN-SUCCESS')
    .mapTo(push('/'))


  const epicLogin = combineEpics(
    epicLoginAttempt,
    epicLoginSuccess
  )

// ====================================
// STORE CONFIG
// ====================================

const epicMiddleware = createEpicMiddleware(epicLogin);
const routermiddleware = routerMiddleware(browserHistory)

const enhancer = compose(
  applyMiddleware(epicMiddleware, routermiddleware),
  persistState(['auth', 'routing']/*, config*/),
)

const store = createStore(
  rootReducer,
  enhancer
)

export default store
