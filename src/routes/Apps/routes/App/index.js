import App from './components/App'
import Edit from './routes/Edit'
import store from '../../../../stores'

const route = {
  path: ':appId',
  getChildRoutes(partialNextState, cb) {
      cb(null, [Edit])
  },

  getComponents(nextState, cb) {
      cb(null, App)
  },

  onEnter(nextState, replace, cb){
    const apps = store.getState().apps.apps
    if (!apps[nextState.params.appId])
      replace({
        pathname: '/apps'
      })
    cb()
  }
}

export default route
