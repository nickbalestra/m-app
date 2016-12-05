import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {
  browserHistory,
  Router,
  Route,
  IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { mustBeLoggedIn, mustBeLoggedOut } from './auth'
import store from './store'
import Main from './Main'
import Dashboard from './Dashboard'
import Login from './Login'
import Logout from './Logout'
import About from './About'

const history = syncHistoryWithStore(browserHistory, store)
history.listen(location => console.log(location.pathname))
const App = () => (
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ Main }>
        <IndexRoute component={ Dashboard } onEnter={ mustBeLoggedIn } />
        <Route path="/login" component={ Login } onEnter={ mustBeLoggedOut } />
        <Route path="/about" component={ About } />
        <Route path="/logout" component={ Logout } />
      </Route>
    </Router>
  </Provider>
)

export default App
