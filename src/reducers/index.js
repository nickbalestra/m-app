import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import auth from '../ducks/auth'
import user from '../ducks/user'
import apps from '../ducks/apps'

export default combineReducers({
  auth,
  user,
  apps,
  routing
})
