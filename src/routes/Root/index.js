import Home from './components/Home'

import Apps from '../Apps'
import Login from '../Login'
import About from '../About'
import NotFound from '../404'


const rootRoute = {
  childRoutes: [
    {
      path: '/',
      component: Home,
      childRoutes: [
        Apps,
        Login,
        About,
        NotFound
      ]
    }
  ],
  onEnter(nextState, replace, cb) {
    if (nextState.location.pathname === '/') {
      replace({
        pathname: '/apps'
      })
    }
    cb()
  },
  onChange(prevState, nextState, replace, cb) {
    if (nextState.location.pathname === '/') {
      replace({
        pathname: '/apps'
      })
    }
    cb()
  }
}

export default rootRoute

