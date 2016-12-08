import { createStore, applyMiddleware, compose } from 'redux'
import persistState from 'redux-localstorage'
import createLogger from 'redux-logger';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from '../epics'
import rootReducer from '../reducers'

const epicMiddleware = createEpicMiddleware(rootEpic)
const routerMiddleware = createRouterMiddleware(browserHistory)
const logger = createLogger()

const enhancer = compose(
  applyMiddleware(epicMiddleware, routerMiddleware, logger),
  persistState(['auth'])
)

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    enhancer
  )
}
