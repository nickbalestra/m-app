import Main from '../components/Main'
import Apps from './Apps'
import Login from './Login'
import About from './About'
import Invalid from './Invalid'


const rootRoute = {
  childRoutes: [
    {
      path: '/',
      component: Main,
      childRoutes: [
        Apps,
        Login,
        About,
        Invalid
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

