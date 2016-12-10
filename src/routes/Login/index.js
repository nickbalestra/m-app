import Login from './components/Login'
import store from '../../stores'

const route = {
  path: 'login',
  getComponent(nextState, cb) {
    cb(null, Login)
  },
  onEnter(nextState, replace, cb) {
    if (store.getState().auth.token) {
      replace({
        pathname: '/'
      })
    }
    cb()
  }
}

export default route
