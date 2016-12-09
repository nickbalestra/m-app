import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from './stores/configureStore'
import { utils } from './ducks/auth'
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

import App from './components/App'
  import Dashboard from './components/Dashboard'
  import Login from './components/Login'
  import About from './components/About'


export default () => (
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ App }>
        <IndexRoute onEnter={ utils.sendToApps(store) } />
        <Route path="apps" component={ Dashboard } />
        <Route path="apps/:appId" component={ About } />
        <Route path="apps/:appId/edit" component={ Login } />
        <Route path="login" component={ Login } onEnter={ utils.mustBeLoggedOut(store) } />
        <Route path="about" component={ About } />
      </Route>
    </Router>
  </Provider>
)

/*
/apps -> lista apps
../appId -> singole app (con fetch user)
..../edit -> edit singola app on save send to /appId
*/
