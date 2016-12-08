import { createStore, applyMiddleware, compose } from 'redux'
import persistState from 'redux-localstorage'
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from '../epics'
import rootReducer from '../reducers'

const epicMiddleware = createEpicMiddleware(rootEpic)
const routerMiddleware = createRouterMiddleware(browserHistory)

const enhancer = compose(
  applyMiddleware(epicMiddleware, routerMiddleware),
  persistState(['auth'])
)

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    enhancer
  )
}
