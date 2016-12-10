import App from './components/App'
import Edit from './routes/Edit'
const route = {
  path: ':appId',

  getChildRoutes(partialNextState, cb) {

      cb(null, [Edit])

  },

  getComponents(nextState, cb) {

      cb(null, App)

  }
}

export default route
